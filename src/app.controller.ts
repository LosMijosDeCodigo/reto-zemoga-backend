import {
  Controller,
  Get,
  Header,
  NotFoundException,
  Param,
  Res,
} from '@nestjs/common';
import { createReadStream, exists, existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private UBICATGES = '';
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): any {
    return this.appService.getHello();
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
