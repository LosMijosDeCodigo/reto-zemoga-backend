import { BadRequestException, HttpException, Module } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationController } from './publication.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publication } from './entities/publication.entity';
import { PublicationType } from './entities/publicationType.entity';
import { UserModule } from 'src/user/user.module';
import { CommentService } from './services/comment.service';
import { ImageService } from './services/image.service';
import { ReplyService } from './services/reply.service';
import { Comment } from './entities/comment.entity';
import { Image } from './entities/image.entity';
import { Reply } from './entities/reply.entity';
import { FOLDER_UPLOADS } from 'src/config/constants';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { extname } from 'path';

@Module({
  imports: [
    UserModule,
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        dest: configService.get(FOLDER_UPLOADS),
        fileFilter: (req, file, cb) => {
          if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
            return cb(null, true);
          }
          return cb(
            new BadRequestException(
              `El archivo de extencion ${file.mimetype} no es permitido.`,
            ),
            false,
          );
        },
        storage: diskStorage({
          destination: (res, file, cb) =>
            cb(null, configService.get(FOLDER_UPLOADS)),
          filename: (req, file, cb) => {
            let filename = `${uuid()}${extname(file.originalname)}`;
            cb(null, filename);
          },
        }),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([
      Publication,
      PublicationType,
      Comment,
      Image,
      Reply,
    ]),
  ],
  controllers: [PublicationController],
  providers: [PublicationService, CommentService, ImageService, ReplyService],
})
export class PublicationModule {}
