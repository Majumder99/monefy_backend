// src/server.ts
import dotenv from "dotenv";
import app from "./app.js"; // Note the .js extension
import sequelize from "./config/db.js"; // Note the .js extension

dotenv.config();

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Database connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to start server:", error);
    process.exit(1);
  }
}

startServer();
