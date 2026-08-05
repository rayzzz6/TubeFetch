import NodeCache from "node-cache";
import { env } from "../config/env";

/**
 * In-memory cache for analyze results, keyed by video ID.
 * REPLACE-ME: swap for Redis (or similar) in a multi-instance deployment
 * so cache state is shared across server processes.
 */
const cache = new NodeCache({
  stdTTL: env.cache.analyzeTtlSeconds,
  checkperiod: Math.max(30, Math.floor(env.cache.analyzeTtlSeconds / 4)),
  useClones: false,
});

export const cacheService = {
  get<T>(key: string): T | undefined {
    return cache.get<T>(key);
  },
  set<T>(key: string, value: T): void {
    cache.set(key, value);
  },
  del(key: string): void {
    cache.del(key);
  },
};
