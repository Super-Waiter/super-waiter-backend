import express, { Express } from "express";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });
console.log(path.resolve(__dirname, "../.env"));
import { sequelize } from "./database";
import { useMiddlewares } from "./middleware";

export const app: Express = express();
const PORT = process.env.PORT || 3001;
// const IP = "192.168.1.100";

useMiddlewares(app);

export async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    console.log("Database connection has been established successfully.");

    const server = app.listen(PORT as number, () => {
      console.log(
        `⚡️[server]: Server is running at https://localhost:${PORT}`
      );
    });

    return server;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

start();
