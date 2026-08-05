import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { env } from "./config/env";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";
import { generalLimiter } from "./middleware/rateLimiter";
import { requestLogger } from "./middleware/requestLogger";
import analyzeRoute from "./routes/analyze.route";
import downloadRoute from "./routes/download.route";
import healthRoute from "./routes/health.route";

export function createApp() {
  const app = express();

  // Security headers. No inline defaults that expose server internals.
  app.use(
    helmet({
      contentSecurityPolicy: false, // configure per-deployment in front of a real domain
    })
  );

  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow same-origin/non-browser requests (no Origin header) and any configured origin.
        if (!origin || env.corsOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: false,
    })
  );

  app.use(compression());
  app.use(express.json({ limit: "16kb" })); // small limit: this API never needs large bodies
  app.use(requestLogger);

  app.use("/health", healthRoute);

  app.use("/api", generalLimiter);
  app.use("/api/analyze", analyzeRoute);
  app.use("/api/download", downloadRoute);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
