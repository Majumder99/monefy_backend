import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";

class Expense extends Model {
  id!: number;
  description!: string;
  amount!: number;
  date!: Date;
  user_id!: number;
  category_id!: number;
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
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
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
  }
);

export default Expense;
