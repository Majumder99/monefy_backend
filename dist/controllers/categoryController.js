import { CategoryService } from "../services/categoryService.js";
export class CategoryController {
    categoryService = new CategoryService();
    getAllCategories = async (req, res, next) => {
        try {
            const categories = await this.categoryService.getAllCategories();
            res.json(categories);
        }
        catch (error) {
            next(error);
        }
    };
    createCategory = async (req, res, next) => {
        try {
            const userID = req.user?.userId;
            if (userID === undefined) {
                throw new Error("User ID is undefined");
            }
            const category = await this.categoryService.createCategory(parseInt(userID.toString()), req.body);
            res.status(201).json(category);
        }
        catch (error) {
            next(error);
        }
    };
    updateCategory = async (req, res, next) => {
        try {
            const category = await this.categoryService.updateCategory(parseInt(req.params.id), req.body);
            res.json(category);
        }
        catch (error) {
            next(error);
        }
    };
    deleteCategory = async (req, res, next) => {
        try {
            const userID = req.user?.userId;
            if (userID === undefined) {
                throw new Error("User ID is undefined");
            }
            await this.categoryService.deleteCategory(parseInt(userID.toString()), parseInt(req.params.id));
            res.status(204).send();
        }
        catch (error) {
            next(error);
        }
    };
    getCategoryById = async (req, res, next) => {
        try {
            const category = await this.categoryService.getCategoryById(parseInt(req.params.id));
            res.json(category);
        }
        catch (error) {
            next(error);
        }
    };
}
