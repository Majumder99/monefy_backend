import express from "express";
import { EarningController } from "../controllers/earningController";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();
const earningController = new EarningController();

router.get("/", authenticate, earningController.getUserEarnings);
router.post("/", authenticate, earningController.createEarning);
router.put("/:id", authenticate, earningController.updateEarning);
router.delete("/:id", authenticate, earningController.deleteEarning);

export default router;
