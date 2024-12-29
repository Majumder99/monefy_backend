import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";

interface ExpenseAttributes {
  id: number;
  description: string;
  amount: number;
  date: Date;
  user_id: number;
  category_id: number;
}

class Expense extends Model<ExpenseAttributes> implements ExpenseAttributes {
  public id!: number;
  public description!: string;
  public amount!: number;
  public date!: Date;
  public user_id!: number;
  public category_id!: number;
}

Expense.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
        min: 0,
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Expense",
    tableName: "expenses",
    timestamps: true,
  }
);

export default Expense;
