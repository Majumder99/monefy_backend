import { Request, Response } from "express";
import { SubscriptionService } from "../services/subscriptionService.js";

export class SubscriptionController {
  private subscriptionService = new SubscriptionService();

  async createPlan(req: Request, res: Response): Promise<void> {
    try {
      const { type, maxCategories, pricePerMonth, pricePerYear } = req.body;
      const plan = await this.subscriptionService.createSubscriptionPlan({
        type,
        maxCategories,
        pricePerMonth,
        pricePerYear,
      });
      res.status(201).json(plan);
    } catch (error) {
      res.status(400).json({ error });
    }
  }

  async updatePlan(req: Request, res: Response): Promise<void> {
    try {
      const { type } = req.params;
      const { maxCategories, pricePerMonth, pricePerYear } = req.body;
      const plan = await this.subscriptionService.updateSubscriptionPlan(type, {
        maxCategories,
        pricePerMonth,
        pricePerYear,
      });
      res.status(200).json(plan);
    } catch (error) {
      res.status(400).json({ error });
    }
  }

  async deletePlan(req: Request, res: Response): Promise<void> {
    try {
      const { type } = req.params;
      const result = await this.subscriptionService.deleteSubscriptionPlan(
        type
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error });
    }
  }

  async getAllPlans(req: Request, res: Response): Promise<void> {
    try {
      const plans = await this.subscriptionService.getAllSubscriptionPlans();
      res.status(200).json(plans);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  // User subscription controllers
  async subscribe(req: Request, res: Response): Promise<void> {
    try {
      const { userId, type, paymentPeriod } = req.body;
      const result = await this.subscriptionService.createUserSubscription(
        userId,
        type,
        paymentPeriod
      );
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error });
    }
  }

  async cancel(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const result = await this.subscriptionService.cancelUserSubscription(
        parseInt(userId)
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error });
    }
  }
}
