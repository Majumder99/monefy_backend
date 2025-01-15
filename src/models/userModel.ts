import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  hashed_password: string;
  role: string;
  isSubscribed: boolean;
  subscriptionType: string | null;
  subscriptionExpiryDate: Date | null;
  category_created: number;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public hashed_password!: string;
  public role!: string;
  public isSubscribed!: boolean;
  public subscriptionType!: string | null;
  public subscriptionExpiryDate!: Date | null;
  public category_created!: number;
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
      validate: {
        isEmail: true,
      },
    },
    hashed_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      defaultValue: "user",
    },
    isSubscribed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    subscriptionType: {
      type: DataTypes.ENUM("basic", "premium", "pro"),
      allowNull: true,
    },
    subscriptionExpiryDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    category_created: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
  }
);

export default User;
