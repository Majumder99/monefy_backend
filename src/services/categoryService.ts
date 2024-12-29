import { AppError } from "../middleware/errorHandler";
import { Category } from "../models";

export class CategoryService {
  async getAllCategories() {
    return await Category.findAll();
  }

  async createCategory(categoryData: any) {
    return await Category.create(categoryData);
  }

  async updateCategory(id: number, categoryData: any) {
    const category = await Category.findByPk(id);
    if (!category) {
      throw new AppError("Category not found", 404);
    }
    return await category.update(categoryData);
  }

  async deleteCategory(id: number) {
    const category = await Category.findByPk(id);
    if (!category) {
      throw new AppError("Category not found", 404);
    }
    await category.destroy();
  }
}
