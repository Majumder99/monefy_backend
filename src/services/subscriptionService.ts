import { Subscription, User } from "../models/index.js";

export class SubscriptionService {
  // Admin service to create subscription plans
  async createSubscriptionPlan(planData: any) {
    const existingPlan = await Subscription.findOne({
      where: { type: planData.type },
    });

    if (existingPlan) {
      throw new Error("Subscription plan already exists");
    }

    const plan = await Subscription.create(planData);
    return plan;
  }

  // Admin service to update subscription plans
  async updateSubscriptionPlan(
    type: string,
    planData: {
      maxCategories?: number;
      pricePerMonth?: number;
      pricePerYear?: number;
    }
  ) {
    const plan = await Subscription.findOne({ where: { type } });
    if (!plan) {
      throw new Error("Subscription plan not found");
    }

    await plan.update(planData);
    return plan;
  }

  // Admin service to delete subscription plans
  async deleteSubscriptionPlan(type: string) {
    const plan = await Subscription.findOne({ where: { type } });
    if (!plan) {
      throw new Error("Subscription plan not found");
    }

    await plan.destroy();
    return { message: "Subscription plan deleted successfully" };
  }

  // User subscription service
  async createUserSubscription(
    userId: number,
    type: string,
    paymentPeriod: "monthly" | "yearly"
  ) {
    const subscription = await Subscription.findOne({ where: { type } });
    if (!subscription) {
      throw new Error("Invalid subscription type");
    }

    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const expiryDate = new Date();
    expiryDate.setMonth(
      expiryDate.getMonth() + (paymentPeriod === "yearly" ? 12 : 1)
    );

    await user.update({
      isSubscribed: true,
      subscriptionType: type,
      subscriptionExpiryDate: expiryDate,
      category_created: 0,
    });

    return {
      message: "Subscription created successfully",
      subscriptionDetails: {
        type,
        expiryDate,
        maxCategories: subscription.maxCategories,
      },
    };
  }

  // User subscription cancellation service
  async cancelUserSubscription(userId: number) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("User not found");
    }

    await user.update({
      isSubscribed: false,
      subscriptionType: null,
      subscriptionExpiryDate: null,
    });

    return { message: "Subscription cancelled successfully" };
  }

  // Get all subscription plans
  async getAllSubscriptionPlans() {
    return await Subscription.findAll();
  }
}
