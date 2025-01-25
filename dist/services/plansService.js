// plansService.ts
import { Plans, Subscription } from "../models/index.js"; // or wherever your subscription model is
export class PlansService {
    async getAllPlans() {
        return await Plans.findAll({
            include: [
                {
                    model: Subscription, // depends on how you set up the Plan->Subscription association
                    as: "subscriptions",
                },
            ],
        });
    }
    async createPlan(planData) {
        const existing = await Plans.findOne({ where: { type: planData.type } });
        if (existing)
            throw new Error("That plan type already exists");
        return Plans.create(planData);
    }
    async updatePlan(type, planData) {
        const plan = await Plans.findOne({ where: { type } });
        if (!plan) {
            throw new Error("Plan not found");
        }
        return plan.update(planData);
    }
    async deletePlan(type) {
        const plan = await Plans.findOne({ where: { type } });
        if (!plan) {
            throw new Error("Plan not found");
        }
        await plan.destroy();
    }
}
