import { AbstractEntity } from 'src/common/entities/AbstractEntity';
import { Publication } from 'src/publication/entities/publication.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Invoice extends AbstractEntity {
  @JoinColumn()
  @ManyToOne((_) => Publication, (publication) => publication.invoices)
  publication: Publication;

  @JoinColumn()
  @ManyToOne((_) => User, (user) => user.invoices)
  user: User;
  @Column({ type: 'int' })
  rating: number;
}
