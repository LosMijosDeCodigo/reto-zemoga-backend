import { AbstractEntity } from 'src/common/entities/AbstractEntity';
import { Publication } from 'src/publication/entities/publication.entity';
import { Reply } from 'src/publication/entities/reply.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('comments')
export class Comment extends AbstractEntity {
  //login relation
  @Column()
  userId: number;

  @JoinColumn()
  @ManyToOne((_) => Publication, (publication) => publication.comments)
  publication: Publication;

  @OneToMany((_) => Reply, (reply) => reply.comment)
  replies: Reply[];

  @Column({ type: 'text' })
  comment: string;
}
