import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../middlewares/errorHandler.js";
import { Category, Earning, Expense, Subscription, User, } from "../models/index.js";
export class UserService {
    async createUser(userData) {
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
            isSubscribed: false,
            subscriptionType: null,
            subscriptionExpiryDate: null,
            category_created: 0,
        });
        const { hashed_password, ...userWithoutPassword } = user.get();
        return userWithoutPassword;
    }
    async loginUser(email, password) {
        // Ensure the JWT secret is defined
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error("JWT_SECRET environment variable is not defined");
        }
        // Check if the email exists
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new AppError("Invalid credentials", 401);
        }
        // Ensure the password is provided
        if (!password) {
            throw new AppError("Password is required", 400);
        }
        // Validate the password
        const isValidPassword = await bcrypt.compare(password, user.dataValues.hashed_password);
        if (!isValidPassword) {
            throw new AppError("Invalid credentials", 401);
        }
        // Generate the token
        const token = jwt.sign({ userId: user.dataValues.id, role: user.dataValues.role }, jwtSecret, {
            expiresIn: "24h",
        });
        // Exclude the hashed password from the returned user object
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
                    as: "subscription",
                },
                {
                    model: Category,
                    as: "categories",
                },
            ],
        });
        return users;
    }
    async getUserById(id) {
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
                    as: "subscription",
                },
                {
                    model: Category,
                    as: "categories",
                },
            ],
        });
        if (!user) {
            throw new AppError("User not found", 404);
        }
        return user;
    }
    async updateUser(id, userData) {
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
    async deleteUser(id) {
        const user = await User.findByPk(id);
        if (!user) {
            throw new AppError("User not found", 404);
        }
        await user.destroy();
    }
}
