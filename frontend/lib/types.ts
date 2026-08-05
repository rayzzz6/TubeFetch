export type VideoQualityLabel = "360p" | "480p" | "720p" | "1080p";
export type AudioBitrateLabel = "128kbps" | "192kbps" | "320kbps";

export interface VideoFormatOption {
  quality: VideoQualityLabel;
  container: "mp4";
  approxFileSizeMB: number;
  hasAudio: boolean;
}

export interface AudioFormatOption {
  bitrate: AudioBitrateLabel;
  container: "mp3";
  approxFileSizeMB: number;
}

export interface VideoMetadata {
  videoId: string;
  sourceUrl: string;
  title: string;
  channel: string;
  channelVerified: boolean;
  durationSeconds: number;
  thumbnailUrl: string;
  viewCount: number;
  publishedAt: string;
  videoFormats: VideoFormatOption[];
  audioFormats: AudioFormatOption[];
  isMock: true;
}

export interface DownloadJob {
  jobId: string;
  status: "queued" | "processing" | "completed" | "failed";
  progress: number;
  type: "video" | "audio";
  quality: string;
  createdAt: string;
  mockDownloadUrl?: string;
}

export interface HistoryEntry {
  id: string;
  videoId: string;
  title: string;
  channel: string;
  thumbnailUrl: string;
  type: "video" | "audio";
  quality: string;
  downloadedAt: string;
}

export interface ApiErrorShape {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}
