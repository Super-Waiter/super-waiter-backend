import { Sequelize } from "sequelize-typescript";
import { Room } from "../model/Room";
import { Waiter } from "../model/Waiter";

export const sequelize = new Sequelize({
  database: "super-waiter",
  dialect: "postgres",
  username: "sardorbek",
  password: "admin",
  storage: ":memory:",
  host: "localhost",
  // host: 'host.docker.internal',
  define: { freezeTableName: true },
  models: [Waiter, Room],
});
