import bcrypt from "bcrypt";
import { User } from "../models/index.js";

export async function createSuperAdmin() {
  try {
    const existingAdmin = await User.findOne({
      where: { email: "admin@example.com" },
    });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("adminpassword123", 10);
      await User.create({
        id: 1,
        name: "Super Admin",
        email: "admin@example.com",
        hashed_password: hashedPassword,
        role: "admin",
        isSubscribed: true,
        category_created: 0,
        subscriptionExpiryDate: new Date(2030, 11, 31),
        subscriptionType: "pro",
      });
    } else {
      console.log("Super admin already exists");
    }
  } catch (error) {
    console.error("Error creating super admin:", error);
  }
}
