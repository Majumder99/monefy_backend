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
    async getUserEarnings(userId) {
        return await Earning.findAll({
            where: { user_id: userId },
            include: [{ model: Category, as: "category" }],
        });
    }
    async createEarning(earningData) {
        const category = await Category.findByPk(earningData.category_id);
        if (!category || category.dataValues.type !== "earning") {
            throw new AppError("Invalid earning category", 400);
        }
        return await Earning.create(earningData);
    }
    async updateEarning(id, earningData, userId, isAdmin) {
        const earning = await Earning.findByPk(id);
        if (!earning) {
            throw new AppError("Earning not found", 404);
        }
        // Only allow update if user owns the earning or is admin
        if (earning.dataValues.user_id !== userId && !isAdmin) {
            throw new AppError("Not authorized to update this earning", 403);
        }
        if (earningData.category_id) {
            const category = await Category.findByPk(earningData.category_id);
            if (!category || category.dataValues.type !== "earning") {
                throw new AppError("Invalid earning category", 400);
            }
        }
        return await earning.update(earningData);
    }
    async deleteEarning(id, userId, isAdmin) {
        const earning = await Earning.findByPk(id);
        if (!earning) {
            throw new AppError("Earning not found", 404);
        }
        // Only allow deletion if user owns the earning or is admin
        if (earning.dataValues.user_id !== userId && !isAdmin) {
            throw new AppError("Not authorized to delete this earning", 403);
        }
        await earning.destroy();
    }
}
