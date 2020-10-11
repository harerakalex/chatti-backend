import {
  Table,
  Column,
  PrimaryKey,
  AutoIncrement,
  DataType,
  CreatedAt,
  UpdatedAt,
  HasOne,
  HasMany,
} from 'sequelize-typescript';
import { Base } from '../base';
import { Picture } from './Picture';
import { Message } from './Message';

@Table
export class User extends Base<User> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column
  displayName: string;

  @Column
  bio: string;

  @Column({
    allowNull: false,
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  verified: boolean;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

  @HasOne(() => Picture)
  picture: Picture;

  @HasMany(() => Message)
  messages: Message[];
}
