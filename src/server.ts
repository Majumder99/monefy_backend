import dotenv from "dotenv";
import app from "./app.js";
import sequelize from "./config/db.js";
import { createSuperAdmin } from "./utils/createSuperAdmin.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await sequelize.authenticate();

    // Sync database and create super admin
    await sequelize.sync({ alter: true }); // Use alter: true in development, false in production
    await createSuperAdmin();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to start server:", error);
    process.exit(1);
  }
}

startServer();
