import {
  Table,
  Column,
  Model,
  IsUUID,
  PrimaryKey,
  HasMany,
} from "sequelize-typescript";
import { User } from "./User";
import { DataTypes } from "sequelize";

@Table
export class Organisation extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column({ defaultValue: DataTypes.UUIDV4 })
  id!: string;

  @Column
  name!: string;

  @Column
  contactPhone!: string;

  @Column
  email!: string;

  @Column
  subscriptionId!: string;

  @Column
  owner!: string;

  @HasMany(() => User, {
    foreignKey: "organisationId",
    as: "organisationUsers",
  })
  users!: string;
}
