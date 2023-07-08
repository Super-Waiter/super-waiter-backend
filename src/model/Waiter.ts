import {
  Table,
  Column,
  Model,
  HasMany,
  PrimaryKey,
  IsUUID,
} from "sequelize-typescript";
import { Room } from "./Room";
import { Room as RoomType } from "../types";
import { DataTypes } from "sequelize";

@Table
export class Waiter extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column({ defaultValue: DataTypes.UUIDV4 })
  id!: string;

  @Column
  firstName!: string;

  @Column
  lastName!: string;

  @HasMany(() => Room, {
    foreignKey: "roomId",
    as: "rooms",
  })
  rooms!: RoomType[];
}
