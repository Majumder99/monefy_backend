import { AppError } from "../middlewares/errorHandler.js";
import { Category, User } from "../models/index.js";
export class CategoryService {
    async getAllCategories() {
        return await Category.findAll({
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: { exclude: ["hashed_password"] },
                },
            ],
        });
    }
    async createCategory(userID, categoryData) {
        const user = await User.findByPk(userID);
        if (!user) {
            throw new AppError("User not found", 404);
        }
        // update user category count
        await user.increment("category_created");
        return await Category.create({
            ...categoryData,
            user_id: userID,
        });
    }
    async updateCategory(id, categoryData) {
        const category = await Category.findByPk(id);
        if (!category) {
            throw new AppError("Category not found", 404);
        }
        return await category.update(categoryData);
    }
    async deleteCategory(userID, id) {
        const user = await User.findByPk(userID);
        if (!user) {
            throw new AppError("User not found", 404);
        }
        // decrement user category count
        await user.decrement("category_created");
        const category = await Category.findByPk(id);
        if (!category) {
            throw new AppError("Category not found", 404);
        }
        await category.destroy();
    }
    async getCategoryById(id) {
        const category = await Category.findByPk(id, {
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: { exclude: ["hashed_password"] },
                },
            ],
        });
        if (!category) {
            throw new AppError("Category not found", 404);
        }
        return category;
    }
}
