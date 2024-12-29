import express from "express";
import { UserController } from "../controllers/authController.js";
import { authenticate, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();
const userController = new UserController();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/profile", authenticate, userController.getProfile);

// Admin routes
router.get("/users", authenticate, isAdmin, userController.getAllUsers);
router.delete("/users/:id", authenticate, isAdmin, userController.deleteUser);
router.patch("/users/:id", authenticate, isAdmin, userController.updateUser);

export default router;
