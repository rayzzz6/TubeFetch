# TubeFetch API Documentation

Base URL (local): `http://localhost:4000`

All responses are JSON. All endpoints are prefixed with `/api` except `/health`.

> **Note:** This API currently returns **mock data**. `POST /api/analyze` and
> the download endpoints do not contact YouTube or resolve real media
> streams — see `src/services/mockYoutube.service.ts` for the placeholder
> implementation and its `REPLACE-ME` notes.

---

## `GET /health`

Liveness check. Not rate limited.

**200**
```json
{ "status": "ok", "timestamp": "2026-08-04T12:00:00.000Z" }
```

---

## `POST /api/analyze`

Validates a YouTube URL and returns mock video metadata + available formats.

**Rate limit:** shared general limit (default 20 req/min/IP).

### Request
```json
{ "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ" }
```

### 200 Response
```json
{
  "data": {
    "videoId": "dQw4w9WgXcQ",
    "sourceUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "title": "Building a Modern Web App From Scratch",
    "channel": "Northbeam Studio",
    "channelVerified": true,
    "durationSeconds": 612,
    "thumbnailUrl": "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    "viewCount": 182345,
    "publishedAt": "2026-05-01T00:00:00.000Z",
    "videoFormats": [
      { "quality": "360p", "container": "mp4", "approxFileSizeMB": 24.5, "hasAudio": true },
      { "quality": "480p", "container": "mp4", "approxFileSizeMB": 40.8, "hasAudio": true },
      { "quality": "720p", "container": "mp4", "approxFileSizeMB": 85.7, "hasAudio": true },
      { "quality": "1080p", "container": "mp4", "approxFileSizeMB": 155.2, "hasAudio": true }
    ],
    "audioFormats": [
      { "bitrate": "128kbps", "container": "mp3", "approxFileSizeMB": 5.7 },
      { "bitrate": "192kbps", "container": "mp3", "approxFileSizeMB": 8.4 },
      { "bitrate": "320kbps", "container": "mp3", "approxFileSizeMB": 13.8 }
    ],
    "isMock": true
  },
  "cached": false
}
```

### Errors
| Status | Code | When |
|---|---|---|
| 400 | `VALIDATION_ERROR` | Body missing/malformed `url` |
| 422 | `INVALID_YOUTUBE_URL` | URL doesn't resolve to a YouTube video ID |
| 429 | `RATE_LIMITED` | Too many requests |

---

## `POST /api/download`

Starts a mock download job and returns a job ID to poll.

**Rate limit:** stricter limit (default 5 req/min/IP).

### Request
```json
{
  "videoId": "dQw4w9WgXcQ",
  "sourceUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "type": "video",
  "quality": "720p"
}
```

### 202 Response
```json
{
  "data": {
    "jobId": "b3f1c2a0-...",
    "status": "queued",
    "progress": 0,
    "type": "video",
    "quality": "720p",
    "createdAt": "2026-08-04T12:00:00.000Z"
  }
}
```

### Errors
| Status | Code | When |
|---|---|---|
| 400 | `VALIDATION_ERROR` | Malformed body |
| 422 | `INVALID_QUALITY` | Quality not valid for the given type |
| 429 | `DOWNLOAD_RATE_LIMITED` | Too many download starts |

---

## `GET /api/download/:jobId`

Poll job status. Progress advances automatically in this mock implementation
(~4 seconds to completion) to simulate a queued/processing/completed flow.

### 200 Response
```json
{
  "data": {
    "jobId": "b3f1c2a0-...",
    "status": "completed",
    "progress": 100,
    "type": "video",
    "quality": "720p",
    "createdAt": "2026-08-04T12:00:00.000Z",
    "mockDownloadUrl": "/api/download/b3f1c2a0-.../mock-file"
  }
}
```

### Errors
| Status | Code | When |
|---|---|---|
| 404 | `JOB_NOT_FOUND` | Unknown job ID |

---

## Error shape

All errors follow:
```json
{ "error": { "code": "STRING_CODE", "message": "Human-readable message", "details": {} } }
```

## Security notes

- Helmet sets standard security headers; CORS is allow-listed via `CORS_ORIGINS`.
- Request bodies are capped at 16kb — this API never needs more.
- Rate limiting is per-IP via `express-rate-limit`; swap the store for Redis
  behind a load balancer so limits are enforced across instances.
- No API keys or secrets are ever sent to the client. When a real media
  provider is integrated, its credentials live only in server-side env vars.
