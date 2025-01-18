import sequelize from "../config/db.js";
import Category from "./categoryModel.js";
import Earning from "./earningsModel.js";
import Expense from "./expensesModel.js";
import Plans from "./plansModel.js";
import Subscription from "./subscriptionModel.js";
import User from "./userModel.js";

// User associations
User.hasMany(Expense, {
  foreignKey: "user_id",
  as: "expenses",
  onDelete: "CASCADE",
});
User.hasMany(Earning, {
  foreignKey: "user_id",
  as: "earnings",
  onDelete: "CASCADE",
});
User.hasMany(Category, {
  foreignKey: "user_id",
  as: "categories",
  onDelete: "CASCADE",
});
User.hasOne(Subscription, {
  foreignKey: "user_id",
  as: "subscription",
  onDelete: "CASCADE",
});

// Associations: A Subscription belongs to a single User
Subscription.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

// Associations: A Subscription belongs to a single Plan
Subscription.belongsTo(Plans, {
  foreignKey: "plan_type",
  as: "plan",
});

// A Plan can be used by many subscriptions
Plans.hasMany(Subscription, {
  foreignKey: "plan_type",
  as: "subscriptions",
  onDelete: "CASCADE",
});

// Category associations
Category.hasMany(Expense, {
  foreignKey: "category_id",
  as: "expenses",
  onDelete: "CASCADE",
});
Category.hasMany(Earning, {
  foreignKey: "category_id",
  as: "earnings",
  onDelete: "CASCADE",
});
Category.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

// Expense associations
Expense.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});
Expense.belongsTo(Category, {
  foreignKey: "category_id",
  as: "category",
});

// Earning associations
Earning.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});
Earning.belongsTo(Category, {
  foreignKey: "category_id",
  as: "category",
});

export const syncDatabase = async (force: boolean = false) => {
  try {
    await sequelize.sync({ force });
    console.log("Database synchronized successfully");
  } catch (error) {
    console.error("Error synchronizing database:", error);
    throw error;
  }
};

export { Category, Earning, Expense, Subscription, User };
