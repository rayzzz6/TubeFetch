/**
 * Minimal structured logger. Swap for pino/winston in a real deployment.
 * Never log secrets, tokens, or full request bodies.
 */
type Level = "info" | "warn" | "error" | "debug";

function line(level: Level, message: string, meta?: Record<string, unknown>) {
  const entry = {
    ts: new Date().toISOString(),
    level,
    message,
    ...(meta ?? {}),
  };
  const out = level === "error" ? console.error : console.log;
  out(JSON.stringify(entry));
}

export const logger = {
  info: (message: string, meta?: Record<string, unknown>) => line("info", message, meta),
  warn: (message: string, meta?: Record<string, unknown>) => line("warn", message, meta),
  error: (message: string, meta?: Record<string, unknown>) => line("error", message, meta),
  debug: (message: string, meta?: Record<string, unknown>) => {
    if (process.env.NODE_ENV !== "production") line("debug", message, meta);
  },
};
