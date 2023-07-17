import {
  Table,
  Column,
  Model,
  HasMany,
  PrimaryKey,
  IsUUID,
  BelongsTo,
} from "sequelize-typescript";
import { Room } from "./Room";
import { ROLE, Room as RoomType } from "../types";
import { DataTypes } from "sequelize";
import { Organisation } from "./Organisation";

@Table
export class User extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column({ defaultValue: DataTypes.UUIDV4 })
  id!: string;

  @Column
  role!: ROLE;

  @Column
  email!: string;

  @Column
  phone!: string;

  @Column
  firstName!: string;

  @Column
  lastName!: string;

  @HasMany(() => Room, {
    foreignKey: "userId",
    as: "rooms",
  })
  rooms!: RoomType[];

  @BelongsTo(() => Organisation, {
    foreignKey: "organisationId", // Change the foreignKey option
    as: "userOrganisation", // Change the 'as' option to avoid naming collision
  })
  @IsUUID(4)
  @Column({ defaultValue: DataTypes.UUIDV4 })
  organisation!: string;
}
