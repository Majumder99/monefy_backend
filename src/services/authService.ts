import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../middlewares/errorHandler.js";
import { Earning, Expense, Subscription, User } from "../models/index.js";

export class UserService {
  async createUser(userData: any) {
    const existingUser = await User.findOne({
      where: { email: userData.email },
    });
    if (existingUser) {
      throw new AppError("Email already exists", 400);
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await User.create({
      ...userData,
      hashed_password: hashedPassword,
      role: "user",
    });

    const { hashed_password, ...userWithoutPassword } = user.get();
    return userWithoutPassword;
  }

  async loginUser(email: string, password: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new AppError("Invalid credentials", 401);
    }

    const isValidPassword = await bcrypt.compare(
      password,
      user.hashed_password
    );
    if (!isValidPassword) {
      throw new AppError("Invalid credentials", 401);
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "24h" }
    );
    const { hashed_password, ...userWithoutPassword } = user.get();
    return { user: userWithoutPassword, token };
  }

  async getAllUsers() {
    const users = await User.findAll({
      attributes: { exclude: ["hashed_password"] },
      include: [
        {
          model: Expense,
          as: "expenses",
        },
        {
          model: Earning,
          as: "earnings",
        },
        {
          model: Subscription,
          as: "subscriptions",
        },
      ],
    });
    return users;
  }

  async getUserById(id: number) {
    const user = await User.findByPk(id, {
      attributes: { exclude: ["hashed_password"] },
      include: [
        {
          model: Expense,
          as: "expenses",
        },
        {
          model: Earning,
          as: "earnings",
        },
        {
          model: Subscription,
          as: "subscriptions",
        },
      ],
    });
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return user;
  }

  async updateUser(id: number, userData: any) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    //  super admin can only update their name and email
    if (userData.password || userData.role) {
      throw new AppError("Invalid fields", 400);
    }

    await user.update(userData);
    return user;
  }

  async deleteUser(id: number) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    await user.destroy();
  }
}
