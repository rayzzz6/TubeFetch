import { AudioFormatOption, VideoFormatOption, VideoMetadata } from "../types";

/**
 * ---------------------------------------------------------------------------
 * MOCK MEDIA SERVICE — placeholder implementation.
 *
 * This service returns deterministic, fabricated metadata for any valid
 * YouTube URL so the rest of the application (UI, download flow, history,
 * queueing) can be built and demoed end-to-end.
 *
 * It does NOT contact YouTube, scrape any page, or resolve real stream URLs.
 *
 * REPLACE-ME: to go live, implement this same interface
 * (`analyzeVideo(videoId, sourceUrl)`) against a media source you are
 * properly licensed to use, and swap the import in
 * `controllers/analyze.controller.ts`. Keep all provider credentials in
 * environment variables (see .env.example) and never in source or on the
 * client.
 * ---------------------------------------------------------------------------
 */

const MOCK_TITLES = [
  "Building a Modern Web App From Scratch",
  "How Synthesizers Actually Work",
  "A Quiet Morning in the Mountains",
  "The Physics of Black Holes, Explained",
  "10 Minute Desk Stretch Routine",
];

const MOCK_CHANNELS = ["Northbeam Studio", "Wavelength", "Field Notes", "Openframe", "Signal & Noise"];

function seededPick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length];
}

function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function buildVideoFormats(seed: number): VideoFormatOption[] {
  const base: { quality: VideoFormatOption["quality"]; sizeFactor: number }[] = [
    { quality: "360p", sizeFactor: 0.6 },
    { quality: "480p", sizeFactor: 1 },
    { quality: "720p", sizeFactor: 2.1 },
    { quality: "1080p", sizeFactor: 3.8 },
  ];
  // Occasionally omit 1080p to simulate real-world availability variance.
  const includeCount = seed % 5 === 0 ? 3 : 4;
  const durationFactor = 8 + (seed % 20);

  return base.slice(0, includeCount).map((b) => ({
    quality: b.quality,
    container: "mp4",
    approxFileSizeMB: Math.round(b.sizeFactor * durationFactor * 10) / 10,
    hasAudio: true,
  }));
}

function buildAudioFormats(seed: number): AudioFormatOption[] {
  const base: { bitrate: AudioFormatOption["bitrate"]; sizeFactor: number }[] = [
    { bitrate: "128kbps", sizeFactor: 0.95 },
    { bitrate: "192kbps", sizeFactor: 1.4 },
    { bitrate: "320kbps", sizeFactor: 2.3 },
  ];
  const durationFactor = 3 + (seed % 6);

  return base.map((b) => ({
    bitrate: b.bitrate,
    container: "mp3",
    approxFileSizeMB: Math.round(b.sizeFactor * durationFactor * 10) / 10,
  }));
}

export async function analyzeVideo(videoId: string, sourceUrl: string): Promise<VideoMetadata> {
  // Simulate network/processing latency of a real provider call.
  await new Promise((resolve) => setTimeout(resolve, 500 + Math.random() * 500));

  const seed = hashString(videoId);
  const durationSeconds = 90 + (seed % 900);
  const publishedDaysAgo = 3 + (seed % 700);

  return {
    videoId,
    sourceUrl,
    title: seededPick(MOCK_TITLES, seed),
    channel: seededPick(MOCK_CHANNELS, seed + 1),
    channelVerified: seed % 3 === 0,
    durationSeconds,
    thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    viewCount: 1200 + (seed % 4_500_000),
    publishedAt: new Date(Date.now() - publishedDaysAgo * 86_400_000).toISOString(),
    videoFormats: buildVideoFormats(seed),
    audioFormats: buildAudioFormats(seed),
    isMock: true,
  };
}
