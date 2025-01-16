import { NextFunction, Request, Response } from "express";
import { Subscription, User } from "../models/index.js";

export const checkSubscription = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // 1. Check that we have a userId in req.user
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ error: "Unauthorized. No user ID found." });
      return;
    }

    // 2. Fetch the user
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).json({ error: "User not found." });
    }

    // 3. Check if user is subscribed
    if (user && !user.isSubscribed) {
      res.status(403).json({
        error: "Subscription required to perform this action",
      });
    }

    // 4. Check if the subscription has expired
    const currentDate = new Date();
    if (
      user &&
      user.subscriptionExpiryDate &&
      user.subscriptionExpiryDate < currentDate
    ) {
      // Mark the user as unsubscribed
      await user.update({
        isSubscribed: false,
        subscriptionType: null,
        subscriptionExpiryDate: null,
      });

      res.status(403).json({
        error: "Subscription has expired",
      });
    }

    // 5. Fetch the subscription details based on user's subscriptionType
    if (user && !user.subscriptionType) {
      res.status(403).json({ error: "No valid subscription type found." });
    }

    const subscription =
      user &&
      user.subscriptionType &&
      (await Subscription.findOne({
        where: { type: user.subscriptionType },
      }));
    if (!subscription) {
      res.status(404).json({
        error: "Subscription details not found for this user",
      });
    }

    // 6. Check if user has reached their category creation limit
    if (
      user &&
      subscription &&
      user.category_created >= subscription.maxCategories
    ) {
      res.status(403).json({
        error:
          "You have reached the maximum category creation limit for your subscription.",
      });
    }

    // 7. If all checks pass, proceed to the next middleware
    next();
  } catch (error) {
    console.error("Subscription check error:", error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};
