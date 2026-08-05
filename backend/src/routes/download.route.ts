import { Router } from "express";
import {
  createDownloadController,
  downloadSchema,
  getDownloadStatusController,
} from "../controllers/download.controller";
import { validateBody } from "../middleware/validateRequest";
import { downloadLimiter } from "../middleware/rateLimiter";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.post("/", downloadLimiter, validateBody(downloadSchema), asyncHandler(createDownloadController));
router.get("/:jobId", asyncHandler(getDownloadStatusController));

export default router;
