import { NextFunction, Request, Response } from "express";
import { logger } from "../utils/logger";

export class ApiException extends Error {
  status: number;
  code: string;
  details?: unknown;

  constructor(status: number, code: string, message: string, details?: unknown) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({
    error: { code: "NOT_FOUND", message: `No route for ${req.method} ${req.path}` },
  });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ApiException) {
    logger.warn("Handled API exception", { code: err.code, path: req.path, status: err.status });
    return res.status(err.status).json({
      error: { code: err.code, message: err.message, details: err.details },
    });
  }

  // Never leak internal error details (stack traces, DB errors, etc.) to clients.
  logger.error("Unhandled error", {
    path: req.path,
    message: err instanceof Error ? err.message : String(err),
  });

  res.status(500).json({
    error: { code: "INTERNAL_ERROR", message: "Something went wrong. Please try again." },
  });
}
