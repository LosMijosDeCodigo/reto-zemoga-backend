import { AbstractEntity } from 'src/common/entities/AbstractEntity';
import { Invoice } from 'src/invoice/entities/invoice.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Comment } from './comment.entity';
import { Image } from './image.entity';
import { PublicationType } from './publicationType.entity';

@Entity('publications')
export class Publication extends AbstractEntity {
  @Column()
  name: string;

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'text' })
  contact: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @JoinColumn()
  @ManyToOne((_) => User, (user) => user.publications)
  user: User;

  @JoinColumn()
  @ManyToOne(
    (_) => PublicationType,
    (publicationType) => publicationType.publications,
  )
  publicationType: PublicationType;

  @OneToMany((_) => Image, (image) => image.publication)
  images: Image[];

  @OneToMany((_) => Comment, (comment) => comment.publication)
  comments: Comment[];

  @OneToMany((_) => Invoice, (invoice) => invoice.publication)
  invoices: Invoice[];
}
