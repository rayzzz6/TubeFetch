const YOUTUBE_HOST_PATTERN = /(^|\.)(youtube\.com|youtu\.be|youtube-nocookie\.com)$/i;

/**
 * Extracts an 11-character YouTube video ID from a URL, or returns null.
 * Accepts watch, share (youtu.be), embed, and shorts URL shapes.
 */
export function extractVideoId(rawUrl: string): string | null {
  let url: URL;
  try {
    url = new URL(rawUrl.trim());
  } catch {
    return null;
  }

  if (!/^https?:$/.test(url.protocol)) return null;
  if (!YOUTUBE_HOST_PATTERN.test(url.hostname)) return null;

  const idPattern = /^[a-zA-Z0-9_-]{11}$/;

  if (url.hostname === "youtu.be") {
    const id = url.pathname.slice(1).split("/")[0];
    return idPattern.test(id) ? id : null;
  }

  if (url.pathname === "/watch") {
    const id = url.searchParams.get("v");
    return id && idPattern.test(id) ? id : null;
  }

  const shortsMatch = url.pathname.match(/^\/shorts\/([a-zA-Z0-9_-]{11})/);
  if (shortsMatch) return shortsMatch[1];

  const embedMatch = url.pathname.match(/^\/embed\/([a-zA-Z0-9_-]{11})/);
  if (embedMatch) return embedMatch[1];

  const liveMatch = url.pathname.match(/^\/live\/([a-zA-Z0-9_-]{11})/);
  if (liveMatch) return liveMatch[1];

  return null;
}

export function isValidYoutubeUrl(rawUrl: string): boolean {
  return extractVideoId(rawUrl) !== null;
}
