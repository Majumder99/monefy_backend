import express from "express";
import { ExpenseController } from "../controllers/expensesController.js";
import { authenticate, isAdmin } from "../middlewares/authMiddleware.js";
const router = express.Router();
const expenseController = new ExpenseController();
router.get("/", authenticate, expenseController.getUserExpenses);
router.post("/", authenticate, expenseController.createExpense);
router.put("/:id", authenticate, expenseController.updateExpense);
router.delete("/:id", authenticate, expenseController.deleteExpense);
// only for admin
router.get("/all", authenticate, isAdmin, expenseController.getAllExpenses);
export default router;
