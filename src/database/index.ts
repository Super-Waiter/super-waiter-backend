import { Sequelize } from "sequelize-typescript";
import { Room } from "../model/Room";
import { User } from "../model/User";
import { Organisation } from "../model/Organisation";

const POSTGRES_USERNAME = process.env.POSTGRES_USERNAME;
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
const POSTGRES_DATABASE = process.env.POSTGRES_DATABASE;

export const sequelize = new Sequelize({
  database: POSTGRES_DATABASE,
  dialect: "postgres",
  username: POSTGRES_USERNAME,
  password: POSTGRES_PASSWORD,
  storage: ":memory:",
  host: "localhost",
  // host: 'host.docker.internal',
  define: { freezeTableName: true },
  models: [User, Room, Organisation],
});
