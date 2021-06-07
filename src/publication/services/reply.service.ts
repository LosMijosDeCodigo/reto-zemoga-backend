import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { Repository } from 'typeorm';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { Reply } from '../entities/reply.entity';

@Injectable()
export class ReplyService {
  constructor(
    @InjectRepository(Reply)
    private readonly replyRepository: Repository<Reply>,
  ) {}
  create(createCommnetDto: CreateCommentDto) {
    const comment = this.replyRepository.create(createCommnetDto);
    return this.replyRepository.save(comment);
  }

  findAll(publicationId: number, paginate: PaginationQueryDto) {
    const { offset, limit } = paginate;
    return this.replyRepository.find({
      where: { publication: publicationId },
      take: limit,
      skip: offset,
    });
  }

  findOne(id: number) {
    return this.replyRepository.findOne(id);
  }

  update(id: number, createCommnetDto: CreateCommentDto) {
    return `This action updates a #${id} image`;
  }

  async remove(id: number) {
    const comment = await this.replyRepository.findOne(id);
    return this.replyRepository.remove(comment);
  }
}
