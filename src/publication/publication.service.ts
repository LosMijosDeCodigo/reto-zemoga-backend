import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { Publication } from './entities/publication.entity';
import { PublicationType } from './entities/PublicationType.entity';

@Injectable()
export class PublicationService {
  constructor(
    @InjectRepository(Publication)
    private readonly publicationRepository: Repository<Publication>,
    @InjectRepository(PublicationType)
    private readonly publicationTypeRepository: Repository<PublicationType>,
    private readonly userService: UserService,
  ) {}
  async create(createPublicationDto: CreatePublicationDto) {
    const { userId, publicationTypeId } = createPublicationDto;
    const user = await this.userService.findOne(userId);
    const publicationType = await this.publicationTypeRepository.findOne(
      publicationTypeId,
    );
    if (!user || !publicationType)
      throw new NotFoundException(
        'Envias el userId o publicationTypeId de manera correcta.',
      );
    const newPublication =
      this.publicationRepository.create(createPublicationDto);
    const publication = await this.publicationRepository.save(newPublication);
    return publication;
  }

  findAll(pagination: PaginationQueryDto): Promise<Publication[]> {
    const { limit, offset } = pagination;
    return this.publicationRepository.find({
      relations: ['user', 'images', 'publicationType'],
      take: limit,
      skip: offset,
    });
  }

  async findFilter(
    pagination: PaginationQueryDto,
    nameTypePublication: string,
  ) {
    const { limit, offset } = pagination;
    const publicationType = await this.publicationTypeRepository.findOne({
      name: nameTypePublication,
    });
    if (!publicationType)
      throw new NotFoundException(
        `No se encontró el tipo de Publicacion ${nameTypePublication}`,
      );
    const publications = await this.publicationRepository.find({
      where: { publicationType, status: true },
      relations: ['user', 'images'],
      take: limit,
      skip: offset,
    });
    if (!publications) throw new NotFoundException(`No existe la publicacion`);
    return publications;
  }

  findOne(id) {
    return this.publicationRepository.findOne({
      where: { id },
      relations: ['user', 'images', 'publicationType'],
    });
  }
  update(id: number, updatePublicationDto: UpdatePublicationDto) {
    return `This action updates a #${id} publication`;
  }

  async remove(id: number) {
    const publication = await this.publicationRepository.findOne(id);
    // publication.status = false;
  }
}
