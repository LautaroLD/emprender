import { UUIDV4 } from 'sequelize';
import {
  Table,
  Column,
  Model,
  IsEmail,
  Unique,
  DataType,
  PrimaryKey,
  Default,
  AllowNull,
} from 'sequelize-typescript';

export enum UserRole {
  MEMBER = 'MEMBER',
  ADMIN = 'ADMIN',
}

@Table
export class User extends Model {
  @PrimaryKey
  @Default(UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @AllowNull(false)
  @IsEmail
  @Unique
  @Column
  email: string;

  @AllowNull(false)
  @Column
  password: string;

  @AllowNull(false)
  @Default(UserRole.ADMIN)
  @Column(DataType.ENUM(UserRole.MEMBER, UserRole.ADMIN))
  role: UserRole;

  @AllowNull(false)
  @Column
  name: string;

  @Unique
  @Column
  phone: string;

  @AllowNull(false)
  @Column
  country: string;

  @AllowNull(false)
  @Column(DataType.DATEONLY)
  birth_date: string;
}
