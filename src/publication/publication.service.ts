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
  async update(id: number, updatePublicationDto: UpdatePublicationDto) {
    let newPublication = await this.publicationRepository.findOne({
      where: { id, status: true },
    });
    if (!newPublication)
      throw new NotFoundException('No existe la publicacion a editar');
    newPublication = Object.assign(newPublication, updatePublicationDto);
    return this.publicationRepository.save(newPublication);
  }

  async create(createPublicationDto: CreatePublicationDto) {
    const { userId, publicationTypeId } = createPublicationDto;
    const user = await this.userService.findOne(userId);
    const publicationType = await this.publicationTypeRepository.findOne(
      publicationTypeId,
    );
    if (!user || !publicationType)
      throw new NotFoundException(
        'El usuario o tipo de ublicacion es incorrecto.',
      );
    const newPublication =
      this.publicationRepository.create(createPublicationDto);
    newPublication.user = user;
    newPublication.publicationType = publicationType;
    const publication = await this.publicationRepository.save(newPublication);
    delete newPublication.user;
    delete newPublication.publicationType;
    return publication;
  }

  findAll(pagination: PaginationQueryDto): Promise<Publication[]> {
    const { limit, offset } = pagination;
    return this.publicationRepository.find({
      where: { status: true },
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
      where: { status: true, name: nameTypePublication },
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

  async findOne(id) {
    const publication = await this.publicationRepository.findOne({
      where: { id, status: true },
      relations: ['user', 'images', 'publicationType'],
    });
    if (!publication)
      throw new NotFoundException('No se encontró la publicacion');
    delete publication.user.password;
    return publication;
  }

  async remove(id: number) {
    const publication = await this.publicationRepository.findOne(id);
    if (!publication.status)
      throw new NotFoundException('No se encontró la publicacion');
    publication.status = false;
    return this.publicationRepository.save(publication);
  }
}
