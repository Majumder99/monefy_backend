import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/authService.js";

export class UserController {
  private userService = new UserService();

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: "Error in server", error });
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const result = await this.userService.loginUser(email, password);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: "Error in server", error });
      next(error);
    }
  };

  getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.getUserById(req.user!.userId);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Error in server", error });
      next(error);
    }
  };

  updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.updateUser(
        parseInt(req.params.id),
        req.body
      );
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Error in server", error });
      next(error);
    }
  };

  getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.userService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Error in server", error });
      next(error);
    }
  };

  deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.userService.deleteUser(parseInt(req.params.id));
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error in server", error });
      next(error);
    }
  };
}
