import { UUIDV4 } from 'sequelize';
import {
  Table,
  Column,
  Model,
  Unique,
  DataType,
  PrimaryKey,
  Default,
  AllowNull,
} from 'sequelize-typescript';

@Table
export class Category extends Model {
  @PrimaryKey
  @Default(UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @AllowNull(false)
  @Unique
  @Column
  name: string;

  @Column
  description: string;
}
