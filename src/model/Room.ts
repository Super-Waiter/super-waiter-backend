import {
  Table,
  Column,
  Model,
  BelongsTo,
  IsUUID,
  PrimaryKey,
} from "sequelize-typescript";
import { Waiter } from "./Waiter";
import { DataTypes } from "sequelize";

@Table
export class Room extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column({ defaultValue: DataTypes.UUIDV4 })
  id!: string;

  @Column
  name!: string;

  @BelongsTo(() => Waiter, {
    foreignKey: "waiterId", // Change the foreignKey option
    as: "roomWaiter", // Change the 'as' option to avoid naming collision
  })
  @IsUUID(4)
  @Column({ defaultValue: DataTypes.UUIDV4 })
  waiter!: string;
}
