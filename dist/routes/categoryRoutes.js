import express from "express";
import { CategoryController } from "../controllers/categoryController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { checkSubscription } from "../middlewares/subscribeMiddelware.js";
const router = express.Router();
const categoryController = new CategoryController();
router.get("/", authenticate, categoryController.getAllCategories);
router.get("/:id", authenticate, categoryController.getCategoryById);
// Require Subscription
router.post("/", authenticate, checkSubscription, categoryController.createCategory);
router.patch("/:id", authenticate, checkSubscription, categoryController.updateCategory);
router.delete("/:id", authenticate, checkSubscription, categoryController.deleteCategory);
export default router;
