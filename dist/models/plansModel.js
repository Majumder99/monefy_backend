import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";
class Plans extends Model {
    id;
    type;
    maxCategories;
    pricePerMonth;
    pricePerYear;
    // timestamps!
    createdAt;
    updatedAt;
}
Plans.init({
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
}, {
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
});
export default Plans;
