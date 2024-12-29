import express from "express";
import { CategoryController } from "../controllers/categoryController";
import { authenticate, isAdmin } from "../middleware/authMiddleware";

const router = express.Router();
const categoryController = new CategoryController();

router.get("/", authenticate, categoryController.getAllCategories);
router.post("/", authenticate, isAdmin, categoryController.createCategory);
router.patch("/:id", authenticate, isAdmin, categoryController.updateCategory);
router.delete("/:id", authenticate, isAdmin, categoryController.deleteCategory);

export default router;
