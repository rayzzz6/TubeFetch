import { DownloadJob, VideoMetadata } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

export class ApiRequestError extends Error {
  code: string;
  status: number;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
    });
  } catch {
    throw new ApiRequestError(0, "NETWORK_ERROR", "Couldn't reach the server. Check your connection and try again.");
  }

  const body = await res.json().catch(() => null);

  if (!res.ok) {
    const code = body?.error?.code ?? "UNKNOWN_ERROR";
    const message = body?.error?.message ?? "Something went wrong. Please try again.";
    throw new ApiRequestError(res.status, code, message);
  }

  return body as T;
}

export function analyzeVideoUrl(url: string) {
  return request<{ data: VideoMetadata; cached: boolean }>("/api/analyze", {
    method: "POST",
    body: JSON.stringify({ url }),
  });
}

export function startDownload(params: {
  videoId: string;
  sourceUrl: string;
  type: "video" | "audio";
  quality: string;
}) {
  return request<{ data: DownloadJob }>("/api/download", {
    method: "POST",
    body: JSON.stringify(params),
  });
}

export function getDownloadStatus(jobId: string) {
  return request<{ data: DownloadJob }>(`/api/download/${jobId}`, { method: "GET" });
}
