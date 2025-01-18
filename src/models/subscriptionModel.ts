import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db.js";

interface SubscriptionAttributes {
  id: number;
  user_id: number; // which user is subscribed
  plan_type: string; // which plan they're on
  startDate?: Date | null;
  endDate?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

// If you use TypeScript, define optional creation fields as well
type SubscriptionCreationAttributes = Optional<SubscriptionAttributes, "id">;

class Subscription
  extends Model<SubscriptionAttributes, SubscriptionCreationAttributes>
  implements SubscriptionAttributes
{
  public id!: number;
  public user_id!: number;
  public plan_type!: string;
  public startDate?: Date | null;
  public endDate?: Date | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Subscription.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    plan_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
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
