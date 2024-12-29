import { NextFunction, Request, Response } from "express";
import { CategoryService } from "../services/categoryService.js";

export class CategoryController {
  private categoryService = new CategoryService();

  getAllCategories = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const categories = await this.categoryService.getAllCategories();
      res.json(categories);
    } catch (error) {
      next(error);
    }
  };

  createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category = await this.categoryService.createCategory(req.body);
      res.status(201).json(category);
    } catch (error) {
      next(error);
    }
  };

  updateCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category = await this.categoryService.updateCategory(
        parseInt(req.params.id),
        req.body
      );
      res.json(category);
    } catch (error) {
      next(error);
    }
  };

  deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.categoryService.deleteCategory(parseInt(req.params.id));
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
