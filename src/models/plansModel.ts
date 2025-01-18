import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db.js";

// Define the attributes for a Plan
interface PlanAttributes {
  id: number;
  type: string; // e.g. "Basic", "Premium", "Pro"
  maxCategories: number;
  pricePerMonth: number;
  pricePerYear: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// If you use TypeScript, you can also define Optional fields
type PlanCreationAttributes = Optional<PlanAttributes, "id">;

class Plans
  extends Model<PlanAttributes, PlanCreationAttributes>
  implements PlanAttributes
{
  public id!: number;
  public type!: string;
  public maxCategories!: number;
  public pricePerMonth!: number;
  public pricePerYear!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Plans.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.ENUM("basic", "premium", "pro"),
      allowNull: false,
    },
    maxCategories: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    pricePerMonth: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    pricePerYear: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "Plan",
    tableName: "plans",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["type"],
      },
    ],
  }
);

export default Plans;
