import { NextFunction, Request, Response } from "express";
import { ExpenseService } from "../services/expenseService";

export class ExpenseController {
  private expenseService = new ExpenseService();

  getAllExpenses = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Only admin can get all expenses
      if (req.user?.role === "admin") {
        const expenses = await this.expenseService.getAllExpenses();
        return res.json(expenses);
      }
      res.status(403).json({ message: "Not authorized" });
    } catch (error) {
      next(error);
    }
  };

  getUserExpenses = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const expenses = await this.expenseService.getUserExpenses(
        req.user!.userId
      );
      res.json(expenses);
    } catch (error) {
      next(error);
    }
  };

  createExpense = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const expense = await this.expenseService.createExpense({
        ...req.body,
        user_id: req.user!.userId,
      });
      res.status(201).json(expense);
    } catch (error) {
      next(error);
    }
  };

  updateExpense = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const expense = await this.expenseService.updateExpense(
        parseInt(req.params.id),
        req.body,
        req.user!.userId,
        req.user!.role === "admin"
      );
      res.json(expense);
    } catch (error) {
      next(error);
    }
  };

  deleteExpense = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.expenseService.deleteExpense(
        parseInt(req.params.id),
        req.user!.userId,
        req.user!.role === "admin"
      );
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
