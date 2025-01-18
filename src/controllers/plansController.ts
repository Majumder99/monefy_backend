// plansController.ts
import { RequestHandler } from "express";
import { PlansService } from "../services/plansService";

// For extra clarity, define the shapes of req.params and req.body:
interface CreatePlanBody {
  type: string;
  maxCategories: number;
  pricePerMonth: number;
  pricePerYear: number;
}

// All fields optional for updates:
interface UpdatePlanBody {
  maxCategories?: number;
  pricePerMonth?: number;
  pricePerYear?: number;
}

// route param is "type"
interface PlanParams {
  type: string;
}

export class PlansController {
  private plansService = new PlansService();

  // GET /plans
  public getAllPlans: RequestHandler = async (req, res, next) => {
    try {
      const plans = await this.plansService.getAllPlans();
      res.json({ plans, message: "All plans fetched successfully" });
    } catch (error) {
      next(error);
    }
  };

  // POST /plans
  public createPlan: RequestHandler<{}, {}, CreatePlanBody> = async (
    req,
    res,
    next
  ) => {
    try {
      // req.body is of type CreatePlanBody
      const plan = await this.plansService.createPlan(req.body);
      res.status(201).json({ plan, message: "Plan created successfully" });
    } catch (error) {
      next(error);
    }
  };

  // PATCH /plans/:type
  public updatePlan: RequestHandler<PlanParams, {}, UpdatePlanBody> = async (
    req,
    res,
    next
  ) => {
    try {
      // req.params.type is of type string
      const plan = await this.plansService.updatePlan(
        req.params.type,
        req.body
      );
      res.json({ plan, message: "Plan updated successfully" });
    } catch (error) {
      next(error);
    }
  };

  // DELETE /plans/:type
  public deletePlan: RequestHandler<PlanParams> = async (req, res, next) => {
    try {
      await this.plansService.deletePlan(req.params.type);
      res.status(204).json({ message: "Plan deleted successfully" });
    } catch (error) {
      next(error);
    }
  };
}
