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
// router.post(
//   "/webhook",
//   express.raw({ type: "application/json" }),
//   subscriptionController.webhook
// );
// success and cancel routes
router.get("/success", authenticate, subscriptionController.successPage);
router.get("/cancel", authenticate, subscriptionController.cancelPage);
export default router;
