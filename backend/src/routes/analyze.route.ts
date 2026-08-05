import { Router } from "express";
import { analyzeController, analyzeSchema } from "../controllers/analyze.controller";
import { validateBody } from "../middleware/validateRequest";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.post("/", validateBody(analyzeSchema), asyncHandler(analyzeController));

export default router;
