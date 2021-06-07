import { AbstractEntity } from 'src/common/entities/AbstractEntity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('messages')
export class Message extends AbstractEntity {
  @JoinColumn()
  @ManyToOne((_) => User, (user) => user.messages)
  userSend: User;

  @Column({ name: 'userReceiveId' })
  userReceive: number;

  @Column({ type: 'text' })
  message: string;
}
