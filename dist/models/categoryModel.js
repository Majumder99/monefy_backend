import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";
class Category extends Model {
    id;
    name;
    type;
    user_id;
}
Category.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM("expense", "earning"),
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: "Category",
    tableName: "categories",
    timestamps: true,
});
export default Category;
