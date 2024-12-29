// src/app.ts
import cors from "cors";
import express from "express";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes (uncomment when ready)
// import userRoutes from "./routes/userRoutes";
// import categoryRoutes from "./routes/categoryRoutes";
// import expenseRoutes from "./routes/expenseRoutes";
// import earningRoutes from "./routes/earningRoutes";

// app.use("/users", userRoutes);
// app.use("/categories", categoryRoutes);
// app.use("/expenses", expenseRoutes);
// app.use("/earnings", earningRoutes);

// Basic test route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Monefy API" });
});

export default app;
