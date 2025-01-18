import { NextFunction, Request, Response } from "express";
import { Plans, User } from "../models"; // Import Plans instead of Subscription

export const checkSubscription = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // 1) Check that we have a userId in req.user (from your auth middleware)
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ error: "Unauthorized. No user ID found." });
      return;
    }

    // 2) Fetch the user
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).json({ error: "User not found." });
      return;
    }

    // 3) Check if user is subscribed
    if (!user.isSubscribed) {
      res
        .status(403)
        .json({ error: "Subscription required to perform this action." });
      return;
    }

    // 4) Check if the subscription has expired
    if (user.subscriptionExpiryDate) {
      const currentDate = new Date();
      const subscriptionExpiryDate = new Date(user.subscriptionExpiryDate);

      if (subscriptionExpiryDate < currentDate) {
        // Mark the user as unsubscribed
        await user.update({
          isSubscribed: false,
          subscriptionType: null,
          subscriptionExpiryDate: null,
        });

        res.status(403).json({ error: "Subscription has expired." });
        return;
      }
    }

    // 5) Check if there's a valid subscription type on the user
    if (!user.subscriptionType) {
      res.status(403).json({ error: "No valid subscription type found." });
      return;
    }

    // 6) Fetch the plan details from the Plans table based on user.subscriptionType
    const plan = await Plans.findOne({
      where: { type: user.subscriptionType }, // e.g. "basic", "premium", "pro"
    });

    if (!plan) {
      res.status(404).json({
        error: `Plan details not found for subscription type: ${user.subscriptionType}`,
      });
      return;
    }

    // 7) Check if user has reached their category creation limit
    if (user.category_created >= plan.maxCategories) {
      res.status(403).json({
        error:
          "You have reached the maximum category creation limit for your subscription plan.",
      });
      return;
    }

    // 8) All checks passed; proceed
    next();
  } catch (error) {
    console.error("Subscription check error:", error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};
