// File: src/controllers/categoryController.ts
import { Request, Response } from "express";
import categoryService from "../services/categoryService";

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await categoryService.getCategories(req.query);
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const category = await categoryService.createCategory(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const category = await categoryService.updateCategory(
      req.params.id,
      req.body
import { Router } from 'express';
import { createCategory, getCategories, updateCategory } from '../controllers/categoryController';
import authMiddleware from '../middlewares/authMiddleware';
    res.status(400).json({ error: error.message });
  }
};

// File: src/routes/categoryRoutes.ts
import { Router } from "express";
import {
  getCategories,
  createCategory,
  updateCategory,
import { NextFunction } from 'express';
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authMiddleware, getCategories);
router.post("/", authMiddleware, createCategory);
router.patch("/:id", authMiddleware, updateCategory);

export default router;

// File: src/middlewares/errorMiddleware.ts
import rateLimit from 'express-rate-limit';

const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
import Category from '../models/categoryModel';
};

export default errorMiddleware;

// File: src/middlewares/rateLimiter.ts
import rateLimit from "express-rate-limit";

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests, please try again later.",
});

export default rateLimiter;

// File: src/services/categoryService.ts
import Category from "../models/categoryModel";

  return await Category.findAll();
};

const createCategory = async (data: any) => {
  return await Category.create(data);
};

const updateCategory = async (id: number, data: any) => {
  const category = await Category.findByPk(id);
  if (!category) throw new Error("Category not found");
  return await category.update(data);
};

export default { getCategories, createCategory, updateCategory };

// File: src/services/expenseService.ts
import Expense from "../models/expenseModel";

import expenseService from '../services/expenseService';
};

const createExpense = async (data: any) => {
  return await Expense.create(data);
};

const updateExpense = async (id: number, data: any) => {
  const expense = await Expense.findByPk(id);
  if (!expense) throw new Error("Expense not found");
  return await expense.update(data);
};

export default { getExpenses, createExpense, updateExpense };

// File: src/controllers/expenseController.ts
import { Request, Response } from "express";
import expenseService from "../services/expenseService";

export const getExpenses = async (req: Request, res: Response) => {
  try {
    const expenses = await expenseService.getExpenses(req.user.id);
    res.status(200).json(expenses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const createExpense = async (req: Request, res: Response) => {
  try {
import { createExpense, getExpenses, updateExpense } from '../controllers/expenseController';
    res.status(400).json({ error: error.message });
  }
};

export const updateExpense = async (req: Request, res: Response) => {
  try {
    const expense = await expenseService.updateExpense(req.params.id, req.body);
    res.status(200).json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
import earningService from '../services/earningService';

// File: src/routes/expensesRoutes.ts
import { Router } from "express";
import {
  getExpenses,
  createExpense,
  updateExpense,
} from "../controllers/expenseController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authMiddleware, getExpenses);
router.post("/", authMiddleware, createExpense);
router.patch("/:id", authMiddleware, updateExpense);

export default router;

// File: src/controllers/earningController.ts
import { Request, Response } from "express";
import earningService from "../services/earningService";

export const getEarnings = async (req: Request, res: Response) => {
  try {
    const earnings = await earningService.getEarnings(req.user.id);
    res.status(200).json(earnings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
import { createEarning, getEarnings, updateEarning } from '../controllers/earningController';
  try {
    const earning = await earningService.createEarning(req.body);
    res.status(201).json(earning);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateEarning = async (req: Request, res: Response) => {
  try {
    res.status(200).json(earning);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// File: src/routes/earningsRoutes.ts
import { Router } from "express";
import {
  getEarnings,
  createEarning,
  updateEarning,
} from "../controllers/earningController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authMiddleware, getEarnings);
router.post("/", authMiddleware, createEarning);
router.patch("/:id", authMiddleware, updateEarning);

export default router;

// File: src/services/earningService.ts
import Earning from "../models/earningsModel";

const getEarnings = async (userId: number) => {
  return await Earning.findAll({ where: { user_id: userId } });
};

const createEarning = async (data: any) => {
  return await Earning.create(data);
};

const updateEarning = async (id: number, data: any) => {
  const earning = await Earning.findByPk(id);
  if (!earning) throw new Error("Earning not found");
  return await earning.update(data);
};

export default { getEarnings, createEarning, updateEarning };



### 1. **Auth Controller (`authController.ts`)**
```typescript
import { Request, Response } from 'express';
import userService from '../services/userService';

export const register = async (req: Request, res: Response) => {
  try {
    const user = await userService.registerUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const token = await userService.loginUser(req.body);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export const getUserData = async (req: Request, res: Response) => {
  try {
    const userData = await userService.getUserData(req.user.id);
    res.status(200).json(userData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
```

---

### 2. **Auth Service (`userService.ts`)**
```typescript
import User from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const registerUser = async (data: any) => {
  const { name, email, password } = data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, hashed_password: hashedPassword });
  return { id: user.id, name: user.name, email: user.email };
};

const loginUser = async (data: any) => {
  const { email, password } = data;
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error('User not found');

  const isPasswordValid = await bcrypt.compare(password, user.hashed_password);
  if (!isPasswordValid) throw new Error('Invalid credentials');

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || '', {
    expiresIn: '1h',
  });

  return token;
};

const getUserData = async (userId: number) => {
  const user = await User.findByPk(userId, {
    include: ['expenses', 'earnings'],
  });
  if (!user) throw new Error('User not found');

  return user;
};

export default { registerUser, loginUser, getUserData };
```

---

### 3. **Auth Routes (`authRoutes.ts`)**
```typescript
import { Router } from 'express';
import { register, login, getUserData } from '../controllers/authController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware, getUserData);

export default router;
```

---

### 4. **Auth Middleware (`authMiddleware.ts`)**
```typescript
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

export default authMiddleware;
```

---

### 5. **Environment Variables File (`.env`)**
```plaintext
PORT=3000
DB_NAME=moneyfy
DB_USER=your_db_user
DB_PASS=your_db_password
DB_HOST=localhost
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
JWT_SECRET=your_jwt_secret
```

---

This implementation covers:
- **User authentication and authorization**.
- JWT-based token handling with middleware.
- Essential API endpoints for registration, login, and fetching user data.
- Environment variable configuration.

Let me know if you need anything else!