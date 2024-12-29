import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";
import Earning from "./earningsModel.js";
import Expense from "./expensesModel.js";

class User extends Model {
  id!: number;
  name!: string;
  email!: string;
  hashed_password!: string;
}

User.init(
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
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    hashed_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

User.hasMany(Expense, { foreignKey: "user_id", as: "expenses" });
User.hasMany(Earning, { foreignKey: "user_id", as: "earnings" });

export default User;
