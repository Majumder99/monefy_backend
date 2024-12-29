import express from "express";
import { ExpenseController } from "../controllers/expenseController";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();
const expenseController = new ExpenseController();

router.get("/", authenticate, expenseController.getUserExpenses);
router.post("/", authenticate, expenseController.createExpense);
router.put("/:id", authenticate, expenseController.updateExpense);
router.delete("/:id", authenticate, expenseController.deleteExpense);

export default router;
