import { Sequelize } from "sequelize-typescript";
import { Room } from "../model/Room";
import { User } from "../model/User";
import { Organisation } from "../model/Organisation";

export const sequelize = new Sequelize({
  database: "super-waiter",
  dialect: "postgres",
  username: "sardorbek",
  password: "admin",
  storage: ":memory:",
  host: "localhost",
  // host: 'host.docker.internal',
  define: { freezeTableName: true },
  models: [User, Room, Organisation],
});
