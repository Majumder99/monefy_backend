// subscriptionRoutes.ts
import express from "express";
import { SubscriptionController } from "../controllers/subscriptionController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();
const subscriptionController = new SubscriptionController();

// User subscription routes
router.get("/", authenticate, subscriptionController.getUserSubscription);
router.post("/subscribe", authenticate, subscriptionController.subscribe);
router.post("/cancel", authenticate, subscriptionController.cancel);

export default router;
