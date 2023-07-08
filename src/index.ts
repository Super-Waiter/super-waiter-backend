import express, { Express } from "express";
import * as dotenv from "dotenv";
import path from "path";
import http from "http";
import { Server } from "socket.io";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

import { sequelize } from "./database";
import { useMiddlewares } from "./middleware";
import { useSocket } from "./socket";

const PORT = process.env.PORT || 3001;
// const IP = "192.168.1.100";

export const app: Express = express();
export const server = http.createServer(app);
const io = new Server(server);

useMiddlewares(app);
useSocket(io);

export async function start() {
  try {
    await sequelize.authenticate();
    // await sequelize.sync({ force: true });
    console.log("Database connection has been established successfully.");

    server.listen(PORT as number, () => {
      console.log(
        `⚡️[server]: Server is running at https://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

start();
