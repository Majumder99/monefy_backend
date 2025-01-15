// subscriptionRoutes.ts
import express from "express";
import { SubscriptionController } from "../controllers/subscriptionController.js";
import { authenticate, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();
const subscriptionController = new SubscriptionController();

// Admin routes for managing subscription plans
router.post("/plans", authenticate, isAdmin, subscriptionController.createPlan);

router.put(
  "/plans/:type",
  authenticate,
  isAdmin,
  subscriptionController.updatePlan
);

router.delete(
  "/plans/:type",
  authenticate,
  isAdmin,
  subscriptionController.deletePlan
);

// Public route to view available plans
router.get("/plans", subscriptionController.getAllPlans);

// User subscription routes
router.post("/subscribe", authenticate, subscriptionController.subscribe);

router.post("/cancel/:userId", authenticate, subscriptionController.cancel);

export default router;
