import { AbstractEntity } from 'src/common/entities/AbstractEntity';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import { hash } from 'bcryptjs';
import { Publication } from 'src/publication/entities/publication.entity';
import { Invoice } from 'src/invoice/entities/invoice.entity';
import { Message } from 'src/message/entities/message.entity';
import { Exclude } from 'class-transformer';
@Entity('users')
export class User extends AbstractEntity {
  @Column()
  fullName: string;
  @Column()
  phone: string;
  @Column()
  email: string;

  @Column()
  role: string;

  @Column({ select: false })
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (!this.password) return;
    this.password = await hash(this.password, 10);
  }

  @OneToMany((_) => Publication, (publication) => publication.user)
  publications: Publication[];

  @OneToMany((_) => Invoice, (invoice) => invoice.publication)
  invoices: Invoice[];

  @OneToMany((_) => Message, (message) => message.userSend)
  messages: Message[];
}
