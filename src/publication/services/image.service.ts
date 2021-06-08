import {
  BadRequestException,
  Body,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { ValidateUrl } from 'src/common/dtos/validate-url.dto';
import { FOLDER_UPLOADS } from 'src/config/constants';
import { Repository } from 'typeorm';
import { Image } from '../entities/image.entity';
import { PublicationService } from '../publication.service';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    private readonly publicationService: PublicationService,
    private readonly configService: ConfigService,
  ) {}
  async create(publicationId: number, base64: string) {
    const publication = await this.publicationService.findOne(publicationId);
    if (!publication)
      throw new NotFoundException('La publicacion asociada no existe');
    const newImage = this.imageRepository.create({ base64 });
    newImage.publication = publication;
    const image = await this.imageRepository.save(newImage);
    const { publication: p, ...rest } = image;
    return rest;
  }

  uploadFile(url) {
    let folder = this.configService.get(FOLDER_UPLOADS);
    console.log(folder);
  }
}
