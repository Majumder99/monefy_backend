import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";
import Earning from "./earningsModel.js";
import Expense from "./expensesModel.js";

class Category extends Model {
  id!: number;
  name!: string;
  type!: string; // "expense" or "earning"
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("expense", "earning"),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Category",
  }
);

Category.hasMany(Expense, { foreignKey: "category_id", as: "expenses" });
Category.hasMany(Earning, { foreignKey: "category_id", as: "earnings" });
export default Category;
