import { AbstractEntity } from 'src/common/entities/AbstractEntity';
import { Publication } from 'src/publication/entities/publication.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('images')
export class Image extends AbstractEntity {
  @JoinColumn()
  @ManyToOne((_) => Publication, (publication) => publication.images)
  publication: Publication;
  @Column()
  url: string;
}
