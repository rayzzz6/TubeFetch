import { Request, Response } from "express";
import { z } from "zod";
import { extractVideoId } from "../utils/youtubeUrl";
import { analyzeVideo } from "../services/mockYoutube.service";
import { cacheService } from "../services/cache.service";
import { ApiException } from "../middleware/errorHandler";
import { logger } from "../utils/logger";

export const analyzeSchema = z.object({
  url: z.string().trim().min(1, "URL is required").max(2048, "URL is too long"),
});

export async function analyzeController(req: Request, res: Response) {
  const { url } = req.body as z.infer<typeof analyzeSchema>;

  const videoId = extractVideoId(url);
  if (!videoId) {
    throw new ApiException(422, "INVALID_YOUTUBE_URL", "That doesn't look like a valid YouTube video URL.");
  }

  const cacheKey = `analyze:${videoId}`;
  const cached = cacheService.get(cacheKey);
  if (cached) {
    logger.debug("Analyze cache hit", { videoId });
    return res.status(200).json({ data: cached, cached: true });
  }

  const metadata = await analyzeVideo(videoId, url);
  cacheService.set(cacheKey, metadata);

  res.status(200).json({ data: metadata, cached: false });
}
