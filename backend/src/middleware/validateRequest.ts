import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
import { ApiException } from "./errorHandler";

/** Validates req.body against a Zod schema, replacing it with the parsed/typed result. */
export function validateBody(schema: ZodSchema) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      throw new ApiException(400, "VALIDATION_ERROR", "Request body failed validation.", result.error.flatten());
    }
    req.body = result.data;
    next();
  };
}
