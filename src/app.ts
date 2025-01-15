// src/app.ts
import cors from "cors";
import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import earningRoutes from "./routes/earningsRoutes.js";
import expenseRoutes from "./routes/expensesRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/users", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/earnings", earningRoutes);
app.use("/api/subscriptions", subscriptionRoutes);

export default app;
