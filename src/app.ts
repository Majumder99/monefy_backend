// src/app.ts
import cors from "cors";
import "dotenv/config.js";
import express from "express";
import morgan from "morgan";
import { SubscriptionController } from "./controllers/subscriptionController.js";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import earningRoutes from "./routes/earningsRoutes.js";
import expenseRoutes from "./routes/expensesRoutes.js";
import plansRoutes from "./routes/plansRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";

const app = express();

// test
const subscriptionController = new SubscriptionController();

// Middleware
app.use(cors());
app.use(morgan("dev"));

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  subscriptionController.webhook
);

app.use(express.json());

// view engine setup
app.set("view engine", "ejs");

// Routes
app.use("/api/users", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/earnings", earningRoutes);
app.use("/api/plans", plansRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/", (req, res) => {
  res.send("The backend is running perfectly");
});

export default app;
