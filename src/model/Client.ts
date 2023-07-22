import { DataTypes } from "sequelize";
import {
  Table,
  Column,
  Model,
  PrimaryKey,
  IsUUID,
  BelongsTo,
} from "sequelize-typescript";
import { CLIENT_STATUS } from "../types";
import { Room } from "./Room";
import { Organisation } from "./Organisation";
import { User } from "./User";

@Table
export class Client extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column({ defaultValue: DataTypes.UUIDV4 })
  id!: string;

  @Column
  status!: CLIENT_STATUS;

  @BelongsTo(() => Room, {
    foreignKey: "roomId", // Change the foreignKey option
    as: "clientRoom", // Change the 'as' option to avoid naming collision
  })
  @IsUUID(4)
  @Column({ defaultValue: DataTypes.UUIDV4 })
  room!: string;

  @BelongsTo(() => Organisation, {
    foreignKey: "organisationId", // Change the foreignKey option
    as: "clientOrganisation", // Change the 'as' option to avoid naming collision
  })
  @IsUUID(4)
  @Column({ defaultValue: DataTypes.UUIDV4 })
  organisation!: string;

  @BelongsTo(() => User, {
    foreignKey: "waiterId", // Change the foreignKey option
    as: "clientWaiter", // Change the 'as' option to avoid naming collision
  })
  @IsUUID(4)
  @Column({ defaultValue: DataTypes.UUIDV4 })
  waiter!: string;
}
