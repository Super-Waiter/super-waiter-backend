import {
  Table,
  Column,
  Model,
  BelongsTo,
  IsUUID,
  PrimaryKey,
} from "sequelize-typescript";
import { User } from "./User";
import { DataTypes } from "sequelize";

@Table
export class Room extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column({ defaultValue: DataTypes.UUIDV4 })
  id!: string;

  @Column
  name!: string;

  @BelongsTo(() => User, {
    foreignKey: "userId", // Change the foreignKey option
    as: "roomUser", // Change the 'as' option to avoid naming collision
  })
  @IsUUID(4)
  @Column({ defaultValue: DataTypes.UUIDV4 })
  user!: string;
}
