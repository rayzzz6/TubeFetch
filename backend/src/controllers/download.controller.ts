import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { z } from "zod";
import { ApiException } from "../middleware/errorHandler";
import { DownloadJob } from "../types";

export const downloadSchema = z.object({
  videoId: z.string().regex(/^[a-zA-Z0-9_-]{11}$/, "Invalid video ID"),
  sourceUrl: z.string().url(),
  type: z.enum(["video", "audio"]),
  quality: z.string().min(1),
});

const VALID_VIDEO_QUALITIES = new Set(["360p", "480p", "720p", "1080p"]);
const VALID_AUDIO_QUALITIES = new Set(["128kbps", "192kbps", "320kbps"]);

// In-memory job store for demo purposes only.
// REPLACE-ME: back this with Redis/a queue (BullMQ, SQS, etc.) so jobs
// survive restarts and can be processed by dedicated workers.
const jobs = new Map<string, DownloadJob>();

export async function createDownloadController(req: Request, res: Response) {
  const { type, quality } = req.body as z.infer<typeof downloadSchema>;

  const validSet = type === "video" ? VALID_VIDEO_QUALITIES : VALID_AUDIO_QUALITIES;
  if (!validSet.has(quality)) {
    throw new ApiException(422, "INVALID_QUALITY", `"${quality}" is not a valid ${type} quality option.`);
  }

  const jobId = uuid();
  const job: DownloadJob = {
    jobId,
    status: "queued",
    progress: 0,
    type,
    quality,
    createdAt: new Date().toISOString(),
  };
  jobs.set(jobId, job);

  // Simulate a background worker progressing the job over time.
  simulateProgress(jobId);

  res.status(202).json({ data: job });
}

export async function getDownloadStatusController(req: Request, res: Response) {
  const jobId = req.params.jobId;
  const job = jobs.get(jobId);

  if (!job) {
    throw new ApiException(404, "JOB_NOT_FOUND", "No download job found with that ID.");
  }

  res.status(200).json({ data: job });
}

function simulateProgress(jobId: string) {
  let elapsed = 0;
  const tickMs = 400;
  const interval = setInterval(() => {
    const job = jobs.get(jobId);
    if (!job) {
      clearInterval(interval);
      return;
    }

    elapsed += tickMs;
    job.status = "processing";
    job.progress = Math.min(99, Math.round((elapsed / 4000) * 100));

    if (elapsed >= 4000) {
      job.status = "completed";
      job.progress = 100;
      // Mock URL only — no real file is produced. A real implementation
      // would point to a signed, expiring URL from object storage.
      job.mockDownloadUrl = `/api/download/${jobId}/mock-file`;
      clearInterval(interval);
    }
  }, tickMs);
}
