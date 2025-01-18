// plansService.ts
import { Plans, Subscription } from "../models"; // or wherever your subscription model is

interface CreatePlanData {
  type: string;
  maxCategories: number;
  pricePerMonth: number;
  pricePerYear: number;
}

interface UpdatePlanData {
  maxCategories?: number;
  pricePerMonth?: number;
  pricePerYear?: number;
}

export class PlansService {
  public async getAllPlans() {
    return await Plans.findAll({
      include: [
        {
          model: Subscription, // depends on how you set up the Plan->Subscription association
          as: "subscriptions",
        },
      ],
    });
  }

  public async createPlan(planData: CreatePlanData) {
    const existing = await Plans.findOne({ where: { type: planData.type } });
    if (existing) throw new Error("That plan type already exists");

    return Plans.create(planData);
  }

  public async updatePlan(type: string, planData: UpdatePlanData) {
    const plan = await Plans.findOne({ where: { type } });
    if (!plan) {
      throw new Error("Plan not found");
    }

    return plan.update(planData);
  }

  public async deletePlan(type: string) {
    const plan = await Plans.findOne({ where: { type } });
    if (!plan) {
      throw new Error("Plan not found");
    }
    await plan.destroy();
  }
}
