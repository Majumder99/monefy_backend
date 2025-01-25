// server.ts
import dotenv from "dotenv";
import app from "./app.js";
import sequelize from "./config/db.js";
dotenv.config();
async function connectDatabase() {
    try {
        await sequelize.authenticate();
        // Sync database and create super admin
        await sequelize.sync({ alter: false }); // alter: true for dev, false for production
        // await createSuperAdmin();
        console.log("Database connected and Super Admin created!");
    }
    catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}
// Immediately connect/sync DB at module load
// (so it's ready when Vercel imports this file)
connectDatabase();
// Always start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// IMPORTANT: Export the Express `app` for Vercel serverless.
export default app;
