import { AppError } from "../middlewares/errorHandler.js";
import { Category, Expense, User } from "../models/index.js";

export class ExpenseService {
  async getAllExpenses() {
    return await Expense.findAll({
      include: [
        { model: Category, as: "category" },
        { model: User, as: "user" },
      ],
    });
  }

  async getUserExpenses(userId: number) {
    return await Expense.findAll({
      where: { user_id: userId },
      include: [{ model: Category, as: "category" }],
    });
  }

  async createExpense(expenseData: any) {
    const category = await Category.findByPk(expenseData.category_id);
    if (!category || category.dataValues.type !== "expense") {
      throw new AppError("Invalid expense category", 400);
    }

    return await Expense.create(expenseData);
  }

  async updateExpense(
    id: number,
    expenseData: {
      amount?: number;
      description?: string;
      category_id: number;
    },
    userId: number,
    isAdmin: boolean
  ) {
    const expense = await Expense.findByPk(id);
    if (!expense) {
      throw new AppError("Expense not found", 404);
    }

    // Only allow update if user owns the expense or is admin
    if (expense.dataValues.user_id !== userId && !isAdmin) {
      throw new AppError("Not authorized to update this expense", 403);
    }

    if (expenseData.category_id) {
      const category = await Category.findByPk(expenseData.category_id);
      if (!category || category.dataValues.type !== "expense") {
        throw new AppError("Invalid expense category", 400);
      }
    }

    return await expense.update(expenseData);
  }

  async deleteExpense(id: number, userId: number, isAdmin: boolean) {
    const expense = await Expense.findByPk(id);
    if (!expense) {
      throw new AppError("Expense not found", 404);
    }

    // Only allow deletion if user owns the expense or is admin
    if (expense.dataValues.user_id !== userId && !isAdmin) {
      throw new AppError("Not authorized to delete this expense", 403);
    }

    await expense.destroy();
  }
}
