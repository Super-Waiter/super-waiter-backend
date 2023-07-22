import {
  Table,
  Column,
  Model,
  BelongsTo,
  IsUUID,
  PrimaryKey,
  HasMany,
} from "sequelize-typescript";
import { User } from "./User";
import { DataTypes } from "sequelize";
import { Organisation } from "./Organisation";
import { Client } from "./Client";
import { ROOM_STATUS } from "../types";

@Table
export class Room extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column({ defaultValue: DataTypes.UUIDV4 })
  id!: string;

  @Column
  status!: ROOM_STATUS;

  @Column
  name!: string;

  @BelongsTo(() => User, {
    foreignKey: "userId", // Change the foreignKey option
    as: "roomUser", // Change the 'as' option to avoid naming collision
  })
  @IsUUID(4)
  @Column({ defaultValue: DataTypes.UUIDV4 })
  user!: string;

  @BelongsTo(() => Organisation, {
    foreignKey: "organisationId", // Change the foreignKey option
    as: "roomOrganisation", // Change the 'as' option to avoid naming collision
  })
  @IsUUID(4)
  @Column({ defaultValue: DataTypes.UUIDV4 })
  organisation!: string;

  @HasMany(() => Client, {
    foreignKey: "roomId",
    as: "roomClients",
  })
  client!: string;
}
