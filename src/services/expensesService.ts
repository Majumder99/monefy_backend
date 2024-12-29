import { AppError } from "../middleware/errorHandler";
import { Category, Expense } from "../models";

export class ExpenseService {
  async getAllExpenses() {
    return await Expense.findAll({
      include: [{ model: Category, as: "category" }],
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
    if (!category || category.type !== "expense") {
      throw new AppError("Invalid expense category", 400);
    }

    return await Expense.create(expenseData);
  }

  async updateExpense(
    id: number,
    expenseData: any,
    userId: number,
    isAdmin: boolean
  ) {
    const expense = await Expense.findByPk(id);
    if (!expense) {
      throw new AppError("Expense not found", 404);
    }

    // Only allow update if user owns the expense or is admin
    if (expense.user_id !== userId && !isAdmin) {
      throw new AppError("Not authorized to update this expense", 403);
    }

    if (expenseData.category_id) {
      const category = await Category.findByPk(expenseData.category_id);
      if (!category || category.type !== "expense") {
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
    if (expense.user_id !== userId && !isAdmin) {
      throw new AppError("Not authorized to delete this expense", 403);
    }

    await expense.destroy();
  }
}
