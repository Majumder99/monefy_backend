import express from "express";
import { EarningController } from "../controllers/earningsController.js";
import { authenticate, isAdmin } from "../middlewares/authMiddleware.js";
const router = express.Router();
const earningController = new EarningController();
router.get("/", authenticate, earningController.getUserEarnings);
router.post("/", authenticate, earningController.createEarning);
router.patch("/:id", authenticate, earningController.updateEarning);
router.delete("/:id", authenticate, earningController.deleteEarning);
// for admin
router.get("/all", authenticate, isAdmin, earningController.getAllEarnings);
export default router;
