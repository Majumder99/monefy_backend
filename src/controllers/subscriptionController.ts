import { Request, Response, NextFunction } from "express";
import { SubscriptionService } from "../services/subscriptionService.js";

export class SubscriptionController {
  private subscriptionService = new SubscriptionService();

  // POST /subscribe
   subscribe = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // If your "authenticate" middleware sets req.user!.userId
      const userId = req.user!.userId;

      // e.g. { type: "basic", paymentPeriod: "monthly" }
      const { type, paymentPeriod } = req.body;

      const result = await this.subscriptionService.createUserSubscription(
        userId,
        type,
        paymentPeriod
      );
      res.status(201).json({
        message: "User subscribed successfully",
        result,
      });
    } catch (error) {
      next(error);
    }
  };

  // POST /cancel
   cancel = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId;

      const result = await this.subscriptionService.cancelUserSubscription(
        userId
      );
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  // GET /user subscription
   getUserSubscription = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user!.userId;
      const result = await this.subscriptionService.getUserSubscription(userId);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}
