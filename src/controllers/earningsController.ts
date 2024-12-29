import { NextFunction, Request, Response } from "express";
import { EarningService } from "../services/earningService";

export class EarningController {
  private earningService = new EarningService();

  getAllEarnings = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Only admin can get all earnings
      if (req.user?.role === "admin") {
        const earnings = await this.earningService.getAllEarnings();
        return res.json(earnings);
      }
      res.status(403).json({ message: "Not authorized" });
    } catch (error) {
      next(error);
    }
  };

  getUserEarnings = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const earnings = await this.earningService.getUserEarnings(
        req.user!.userId
      );
      res.json(earnings);
    } catch (error) {
      next(error);
    }
  };

  createEarning = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const earning = await this.earningService.createEarning({
        ...req.body,
        user_id: req.user!.userId,
      });
      res.status(201).json(earning);
    } catch (error) {
      next(error);
    }
  };

  updateEarning = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const earning = await this.earningService.updateEarning(
        parseInt(req.params.id),
        req.body,
        req.user!.userId,
        req.user!.role === "admin"
      );
      res.json(earning);
    } catch (error) {
      next(error);
    }
  };

  deleteEarning = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.earningService.deleteEarning(
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
