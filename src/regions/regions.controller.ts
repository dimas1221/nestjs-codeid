import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  UseInterceptors,
} from '@nestjs/common';
import { RegionsService } from './regions.service';
import { AuthGuard } from '../auth/auth.guard';
import { Regions } from 'entities/Regions';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('regions')
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) {}
  @Get('all')
  findAll() {
    return this.regionsService.findAll();
  }
  @Put(':id')
  async updateRegion(@Param('id') id: string, @Body() body: any) {
    const newCus: any = await this.regionsService.updateRegion(id, body);
    return 'customer updated';
  }

  @Post('create')
  async create(@Body() createTo: Regions) {
    const cus = await this.regionsService.createRegion(createTo);
    if (!cus) {
      return 'error in creating ';
    }
    return 'data customers created';
  }

  @Get(':id')
  async findOne(@Param() params) {
    return await this.regionsService.findOneRegion(params.id);
  }

  @Delete(':id')
  async removeCust(@Param('id') id: any) {
    return await this.regionsService.removeRegion(id);
  }

  // @Post('upload')
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     storage: diskStorage({
  //       destination: 'uploads',
  //       filename: (req, file, cb) => {
  //         const filename: string =
  //           path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
  //         const extension: string = path.parse(file.originalname).ext;

  //         cb(null, `${filename}${extension}`);
  //       },
  //     }),
  //   }),
  // )
  // uploadFile(@UploadedFile() file): Observable<Object> {
  //   console.log(file);
  //   return of({ imagePath: file.path });
  // }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      dest: 'public/upload',
      storage: diskStorage({
        destination: 'public/upload',
        filename(req, file, cb) {
          return cb(null, file.originalname);
        },
      }),
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
  ) {
    await this.regionsService.storeFileInfo(file, body);
    return {
      originalname: file.originalname,
      body,
    };
  }
}
