import { Category, Plans, Subscription, User } from "../models/index.js";

export class SubscriptionService {
  // 1) Create or update user subscription
  async createUserSubscription(
    userId: number,
    planType: string,
    paymentPeriod: "monthly" | "yearly"
  ) {
    // Make sure the plan exists in "plans" table
    const plan = await Plans.findOne({ where: { type: planType } });
    if (!plan) {
      throw new Error("Invalid plan type");
    }

    // Fetch the user
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Calculate endDate (expiryDate)
    const now = new Date();
    const endDate = new Date(
      now.setMonth(now.getMonth() + (paymentPeriod === "yearly" ? 12 : 1))
    );

    // Create or update the subscription row
    // If you only allow 1 subscription per user, you could do an upsert or findOne+update
    const existingSubscription = await Subscription.findOne({
      where: { user_id: userId },
    });

    if (existingSubscription) {
      // update
      await existingSubscription.update({
        plan_id: plan.dataValues.id,
        startDate: new Date(),
        endDate,
      });
    } else {
      // create
      await Subscription.create({
        user_id: userId,
        plan_id: plan.dataValues.id,
        startDate: new Date(),
        endDate,
      });
    }

    // Update user with quick subscription info (optional):
    await user.update({
      isSubscribed: true,
      subscriptionType: plan.dataValues.type, // e.g. "basic"
      subscriptionExpiryDate: endDate,
      category_created: 0,
    });

    return {
      message: "Subscription created successfully",
      subscriptionDetails: {
        planType: plan.dataValues.type,
        expiryDate: endDate,
        maxCategories: plan.maxCategories,
      },
    };
  }

  // 2) Cancel user subscription
  async cancelUserSubscription(userId: number) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // if there's a single subscription row for the user, remove or mark ended
    const subscription = await Subscription.findOne({
      where: { user_id: userId },
    });
    if (!subscription) {
      throw new Error("No active subscription found");
    }

    // You can either destroy the row...
    await subscription.destroy();

    // option 1
    await Category.destroy({
      where: { user_id: userId },
    });

    // option 2
    // await user.destroy();
    // Also update user fields
    await user.update({
      isSubscribed: false,
      subscriptionType: null,
      subscriptionExpiryDate: null,
    });

    return { message: "Subscription cancelled successfully" };
  }

  // 3) Get all plans (the admin-defined plan list)
  async getAllPlans() {
    return Plans.findAll();
  }

  async getPlan(type: string) {
    return Plans.findOne({ where: { type } });
  }

  // 4) (Optional) get user subscription info
  async getUserSubscription(userId: number) {
    // e.g. find subscription row and include plan
    return Subscription.findOne({
      where: { user_id: userId },
      include: [{ model: Plans, as: "plan" }],
    });
  }
}
