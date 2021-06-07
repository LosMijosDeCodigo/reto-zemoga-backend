import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { Repository } from 'typeorm';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { Reply } from '../entities/reply.entity';
import { CommentService } from './comment.service';

@Injectable()
export class ReplyService {
  constructor(
    @InjectRepository(Reply)
    private readonly replyRepository: Repository<Reply>,
    private readonly commentService: CommentService,
  ) {}
  async create(commentId, createCommnetDto: CreateCommentDto) {
    const comment = await this.commentService.findOne(commentId);
    if (!comment)
      throw new NotFoundException('Comentario a replicar inexistente');
    const newReply = this.replyRepository.create(createCommnetDto);
    newReply.commentId = comment;
    const reply = await this.replyRepository.save(newReply);
    delete reply.commentId;
    return reply;
  }

  findAll(commentId: number, paginate: PaginationQueryDto) {
    const { offset, limit } = paginate;
    return this.replyRepository.find({
      where: { commentId: commentId },
      take: limit,
      skip: offset,
    });
  }
  async remove(commentId: number) {
    const comment = await this.replyRepository.findOne(commentId);
    if (!comment)
      throw new NotFoundException('No se encontró la replica a eliminar');
    return this.replyRepository.remove(comment);
  }
}
