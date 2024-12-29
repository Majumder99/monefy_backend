// src/utils/createSuperAdmin.ts
import bcrypt from "bcrypt";
import { User } from "../models";

export async function createSuperAdmin() {
  try {
    const existingAdmin = await User.findOne({
      where: { email: "admin@example.com" },
    });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("adminpassword123", 10);
      await User.create({
        name: "Super Admin",
        email: "admin@example.com",
        hashed_password: hashedPassword,
        role: "admin",
      });
      console.log("Super admin created successfully");
    } else {
      console.log("Super admin already exists");
    }
  } catch (error) {
    console.error("Error creating super admin:", error);
  }
}
