import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";
class User extends Model {
    id;
    name;
    email;
    hashed_password;
    role;
    isSubscribed;
    subscriptionType;
    subscriptionExpiryDate;
    category_created;
}
User.init({
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
}, {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
});
export default User;
