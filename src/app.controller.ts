import {
  Controller,
  Get,
  Header,
  NotFoundException,
  Param,
  Res,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { createReadStream, exists, existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { AppService } from './app.service';
import { Public } from './auth/decorators/public.decorator';
import { ApiKeyGuard } from './auth/guards/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller()
export class AppController {
  private UBICATGES = '';
  // constructor(private readonly appService: AppService) {}
  @Public()
  @Get('guard-false')
  getHello(): any {
    return 'Hellor Workd';
  }

  @Get('guard-true')
  getHello2(): any {
    return 'Hellor Workd';
  }
  // @Get('public/publication-images/:nameImage')
  // @Header('Content-type', 'image/jpeg')
  // getImage(@Param('nameImage') nameImage: string) {
  //   const pathImage = join(
  //     __dirname,
  //     '..',
  //     'public/publication-images',
  //     nameImage,
  //   );
  //   if (!existsSync(pathImage))
  //     throw new NotFoundException('No se encontro la imagen');
  //   const file = readFileSync(pathImage);
  //   return file;
  // }
}
