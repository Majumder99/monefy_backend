import { AppError } from "../middlewares/errorHandler.js";
import { Category, Earning, User } from "../models/index.js";

export class EarningService {
  async getAllEarnings() {
    return await Earning.findAll({
      include: [
        { model: Category, as: "category" },
        { model: User, as: "user" },
      ],
    });
  }

  async getUserEarnings(userId: number) {
    return await Earning.findAll({
      where: { user_id: userId },
      include: [{ model: Category, as: "category" }],
    });
  }

  async createEarning(earningData: any) {
    const category = await Category.findByPk(earningData.category_id);
    if (!category || category.type !== "earning") {
      throw new AppError("Invalid earning category", 400);
    }

    return await Earning.create(earningData);
  }

  async updateEarning(
    id: number,
    earningData: any,
    userId: number,
    isAdmin: boolean
  ) {
    const earning = await Earning.findByPk(id);
    if (!earning) {
      throw new AppError("Earning not found", 404);
    }

    // Only allow update if user owns the earning or is admin
    if (earning.user_id !== userId && !isAdmin) {
      throw new AppError("Not authorized to update this earning", 403);
    }

    if (earningData.category_id) {
      const category = await Category.findByPk(earningData.category_id);
      if (!category || category.type !== "earning") {
        throw new AppError("Invalid earning category", 400);
      }
    }

    return await earning.update(earningData);
  }

  async deleteEarning(id: number, userId: number, isAdmin: boolean) {
    const earning = await Earning.findByPk(id);
    if (!earning) {
      throw new AppError("Earning not found", 404);
    }

    // Only allow deletion if user owns the earning or is admin
    if (earning.user_id !== userId && !isAdmin) {
      throw new AppError("Not authorized to delete this earning", 403);
    }

    await earning.destroy();
  }
}
