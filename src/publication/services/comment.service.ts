import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { Repository } from 'typeorm';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { Comment } from '../entities/comment.entity';
import { PublicationService } from '../publication.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly publicationService: PublicationService,
  ) {}
  async create(publicationId: number, createCommnetDto: CreateCommentDto) {
    const publication = await this.publicationService.findOne(publicationId);
    if (!publication)
      throw new NotFoundException('La publicacion asociada no existe');
    const newComment = this.commentRepository.create(createCommnetDto);
    newComment.publication = publication;
    const comment = await this.commentRepository.save(newComment);
    delete comment.publication;
    return comment;
  }

  findAll(publicationId: number, paginate: PaginationQueryDto) {
    const { offset, limit } = paginate;
    return this.commentRepository.find({
      where: { publication: publicationId },
      take: limit,
      skip: offset,
    });
  }

  findOne(id: number) {
    return this.commentRepository.findOne(id);
  }

  update(id: number, createCommnetDto: CreateCommentDto) {
    return `This action updates a #${id} image`;
  }

  async remove(id: number) {
    const comment = await this.commentRepository.findOne(id);
    if (!comment)
      throw new BadGatewayException('No se encontro el comentario a eliminar');
    return this.commentRepository.remove(comment);
  }
}
