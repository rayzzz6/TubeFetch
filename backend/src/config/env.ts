import dotenv from "dotenv";

dotenv.config();

function required(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if (value === undefined) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: parseInt(required("PORT", "4000"), 10),
  corsOrigins: required("CORS_ORIGINS", "http://localhost:3000").split(",").map((o) => o.trim()),
  rateLimit: {
    windowMs: parseInt(required("RATE_LIMIT_WINDOW_MS", "60000"), 10),
    maxRequests: parseInt(required("RATE_LIMIT_MAX_REQUESTS", "20"), 10),
    downloadMax: parseInt(required("DOWNLOAD_RATE_LIMIT_MAX", "5"), 10),
  },
  cache: {
    analyzeTtlSeconds: parseInt(required("ANALYZE_CACHE_TTL_SECONDS", "300"), 10),
  },
  isProd: (process.env.NODE_ENV ?? "development") === "production",
};
