// plansRoutes.ts
import { Router } from "express";
import { PlansController } from "../controllers/plansController";
import { authenticate, isAdmin } from "../middlewares/authMiddleware";

const router = Router();
const plansController = new PlansController();

// GET all plans
router.get("/", authenticate, isAdmin, plansController.getAllPlans);

// CREATE a plan
router.post("/", authenticate, isAdmin, plansController.createPlan);

// UPDATE a plan (by plan type)
router.patch<{ type: string }>(
  "/:type",
  authenticate,
  isAdmin,
  plansController.updatePlan
);

// DELETE a plan (by plan type)
router.delete<{ type: string }>(
  "/:type",
  authenticate,
  isAdmin,
  plansController.deletePlan
);

export default router;
