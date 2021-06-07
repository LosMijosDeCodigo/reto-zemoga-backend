import { AbstractEntity } from 'src/common/entities/AbstractEntity';
import { Comment } from 'src/publication/entities/comment.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('replies')
export class Reply extends AbstractEntity {
  @Column({ type: 'int' })
  userId: number;

  @JoinColumn({ name: 'commentId' })
  @ManyToOne((_) => Comment, (comment) => comment.replies)
  commentId: Comment;

  @Column({ type: 'text' })
  comment: string;
}
