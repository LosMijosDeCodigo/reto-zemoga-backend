import { AbstractEntity } from 'src/common/entities/AbstractEntity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Publication } from './publication.entity';

@Entity('publication_type')
export class PublicationType extends AbstractEntity {
  @Column()
  name: string;
  @OneToMany((_) => Publication, (publication) => publication.publicationType)
  publications: Publication[];
}
