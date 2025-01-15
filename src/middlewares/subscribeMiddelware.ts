import { NextFunction, Request, Response } from "express";
import { User } from "../models/index.js";

export const checkSubscription = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id; // Assuming you have user data in request
    const user = await User.findByPk(userId);

    if (!user || !user.isSubscribed) {
      return res.status(403).json({
        error: "Subscription required to perform this action",
      });
    }

    const currentDate = new Date();
    if (user.subscriptionExpiryDate < currentDate) {
      await user.update({
        isSubscribed: false,
        subscriptionType: null,
        subscriptionExpiryDate: null,
      });
      return res.status(403).json({
        error: "Subscription has expired",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
