import rateLimit from "express-rate-limit";
import { env } from "../config/env";

/** General API rate limiter — applied to all /api routes. */
export const generalLimiter = rateLimit({
  windowMs: env.rateLimit.windowMs,
  max: env.rateLimit.maxRequests,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: {
      code: "RATE_LIMITED",
      message: "Too many requests. Please slow down and try again shortly.",
    },
  },
});

/** Stricter limiter for the download-initiation endpoint. */
export const downloadLimiter = rateLimit({
  windowMs: env.rateLimit.windowMs,
  max: env.rateLimit.downloadMax,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: {
      code: "DOWNLOAD_RATE_LIMITED",
      message: "Too many download requests. Please wait a moment before starting another.",
    },
  },
});
