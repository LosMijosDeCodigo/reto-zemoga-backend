import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  NotFoundException,
  BadGatewayException,
  UseInterceptors,
  BadRequestException,
  UploadedFiles,
  Put,
} from '@nestjs/common';
import { PublicationService } from './publication.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentService } from './services/comment.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImageService } from './services/image.service';
import { ConfigService } from '@nestjs/config';
import { FOLDER_UPLOADS } from 'src/config/constants';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { ReplyService } from './services/reply.service';

@Controller('publications')
export class PublicationController {
  constructor(
    private readonly publicationService: PublicationService,
    private readonly commentService: CommentService,
    private readonly imageService: ImageService,
    private readonly replyService: ReplyService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  create(@Body() createPublicationDto: CreatePublicationDto) {
    return this.publicationService.create(createPublicationDto);
  }

  @Get()
  findAll(@Query() pagination: PaginationQueryDto) {
    return this.publicationService.findAll(pagination);
  }
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    const publication = this.publicationService.findOne(id);
    if (!publication)
      throw new NotFoundException('No se encontro la publicacion');
    return publication;
  }
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePublicaionDtio: UpdatePublicationDto,
  ) {
    return this.publicationService.update(id, updatePublicaionDtio);
  }
  @Get()
  findFilter(
    @Query('filter') publicationType: string,
    @Query() pagination: PaginationQueryDto,
  ) {
    return this.publicationService.findFilter(pagination, publicationType);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.publicationService.remove(id);
  }

  //comments
  @Post(':id/comments')
  createComment(
    @Param('id', ParseIntPipe) id: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    const comment = this.commentService.create(id, createCommentDto);
    if (!comment) throw new BadGatewayException('Error al crear el recurso');
    return comment;
  }

  @Delete('comments/:id')
  deleteComment(@Param('id', ParseIntPipe) id: number) {
    return this.commentService.remove(id);
  }

  @Get(':id/comments')
  findAllCommnents(
    @Param('id', ParseIntPipe) id: number,
    @Query() paginate: PaginationQueryDto,
  ) {
    return this.commentService.findAll(id, paginate);
  }
  //images

  @Post(':id/images')
  @UseInterceptors(FilesInterceptor('image'))
  async uploadImage(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const filesSaved = files.map((file) => {
      return this.imageService.create(
        id,
        `${this.configService.get(FOLDER_UPLOADS)}/${file.filename}`,
      );
    });
    if (filesSaved.length == 0)
      throw new BadRequestException('No has enviado imagenes');
    return await Promise.all(filesSaved);
  }

  //replies
  @Post('comments/:id/replies')
  createReply(
    @Param('id', ParseIntPipe) id: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    const reply = this.replyService.create(id, createCommentDto);
    if (!reply) throw new BadGatewayException('Error al crear la replica');
    return reply;
  }

  @Get('comments/:id/replies')
  findAllReply(
    @Param('id', ParseIntPipe) id: number,
    @Query() paginate: PaginationQueryDto,
  ) {
    return this.replyService.findAll(id, paginate);
  }

  @Delete('comments/replies/:id')
  deleteReply(@Param('id', ParseIntPipe) id: number) {
    return this.replyService.remove(id);
  }
}
