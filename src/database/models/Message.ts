import {
  Table,
  Column,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
  BelongsTo,
  ForeignKey,
  DataType,
} from 'sequelize-typescript';
import { Base } from '../base';
import { User } from './User';

@Table
export class Message extends Base<Message> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => User)
  @Column
  senderId: number;

  @ForeignKey(() => User)
  @Column
  receiverId: number;

  @Column
  message: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  read: boolean;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

  @BelongsTo(() => User)
  user: User;
}
