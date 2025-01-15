import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";

interface SubscriptionAttributes {
  id: number;
  type: string;
  maxCategories: number;
  pricePerMonth: number;
  pricePerYear: number;
}

class Subscription
  extends Model<SubscriptionAttributes>
  implements SubscriptionAttributes
{
  public id!: number;
  public type!: string;
  public maxCategories!: number;
  public pricePerMonth!: number;
  public pricePerYear!: number;
}

Subscription.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.ENUM("basic", "premium", "pro"),
      unique: true,
      allowNull: false,
    },
    maxCategories: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pricePerMonth: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    pricePerYear: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Subscription",
    tableName: "subscriptions",
    timestamps: true,
  }
);

export default Subscription;
