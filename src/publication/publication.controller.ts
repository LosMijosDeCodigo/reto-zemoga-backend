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
  UploadedFile,
  BadRequestException,
  UploadedFiles,
} from '@nestjs/common';
import { PublicationService } from './publication.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentService } from './services/comment.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from './services/image.service';

@Controller('publications')
export class PublicationController {
  constructor(
    private readonly publicationService: PublicationService,
    private readonly commentService: CommentService,
    private readonly imageService: ImageService,
  ) {}

  @Post()
  create(@Body() createPublicationDto: CreatePublicationDto) {
    return this.publicationService.create(createPublicationDto);
  }

  @Get()
  findAll(@Query() pagination: PaginationQueryDto) {
    return this.publicationService.findAll(pagination);
  }

  @Get(':typePublication')
  findFilter(
    @Query() pagination: PaginationQueryDto,
    @Param('typePublication') typePublication: string,
  ) {
    return this.publicationService.findFilter(pagination, typePublication);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    const publication = this.publicationService.findOne(id);
    if (!publication)
      throw new NotFoundException('No se encontro la publicacion');
    return publication;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publicationService.remove(+id);
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
  @Get(':id/comments')
  findAllCommnents(
    @Param('id', ParseIntPipe) id: number,
    @Query() paginate: PaginationQueryDto,
  ) {
    return this.commentService.findAll(id, paginate);
  }
  //images

  @Post(':id/images')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile() files: Express.Multer.File,
    @Param('id', ParseIntPipe) id: number,
  ) {
    console.log(files);
    // try {
    //   const filesSaved = files.map(({ filename }) => {
    //     return this.imageService.create(id, filename);
    //   });
    //   return await Promise.all(filesSaved);
    // } catch (error) {
    //   throw new BadRequestException('Error al almacenar los archivos');
    // }
  }
}
