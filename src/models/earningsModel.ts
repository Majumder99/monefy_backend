import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";

interface EarningAttributes {
  id: number;
  description: string;
  amount: number;
  date: Date;
  user_id: number;
  category_id: number;
}

class Earning extends Model<EarningAttributes> implements EarningAttributes {
  public id!: number;
  public description!: string;
  public amount!: number;
  public date!: Date;
  public user_id!: number;
  public category_id!: number;
}

Earning.init(
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
    modelName: "Earning",
    tableName: "earnings",
    timestamps: true,
  }
);

export default Earning;
