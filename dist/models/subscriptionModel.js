import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";
class Subscription extends Model {
    id;
    user_id;
    plan_id;
    startDate;
    endDate;
    createdAt;
    updatedAt;
}
Subscription.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    plan_id: {
        type: DataTypes.INTEGER,
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
}, {
    sequelize,
    modelName: "Subscription",
    tableName: "subscriptions",
    timestamps: true,
});
export default Subscription;
