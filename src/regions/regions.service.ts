import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Regions } from 'entities/Regions';
import { createWriteStream } from 'fs';
import multer, { diskStorage } from 'multer';

console.log(multer);

@Injectable()
export class RegionsService {
  //   private storage = diskStorage({
  //     // Tujuan penyimpanan file
  //     destination: (
  //       req: any,
  //       file: any,
  //       cb: (arg0: any, arg1: string) => void,
  //     ) => {
  //       cb(null, './uploads');
  //     },
  // Nama file setelah diupload
  //     filename: (
  //       req: any,
  //       file: { originalname: any },
  //       cb: (arg0: any, arg1: string) => void,
  //     ) => {
  //       cb(null, `${Date.now()}-${file.originalname}`);
  //     },
  //   });

  // Filter file yang diupload
  //   private fileFilter = (
  //     _req: any,
  //     file: { mimetype: string },
  //     cb: (arg0: any, arg1: boolean) => void,
  //   ) => {
  //     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
  //       cb(null, true);
  //     } else {
  //       cb(null, false);
  //     }
  //   };
  // Proses upload file
  //   upload = multer({ storage: this.storage, fileFilter: this.fileFilter });

  constructor(
    @InjectRepository(Regions)
    private regionsRepo: Repository<Regions>,
  ) {}
  //   transform(value: any, metadata: ArgumentMetadata) {
  //     const oneKb = 2000;
  //     return value.size < oneKb;
  //   }

  async findAll(): Promise<any> {
    return await this.regionsRepo.find();
  }

  async updateRegion(id: string, data: Regions): Promise<any> {
    return this.regionsRepo
      .createQueryBuilder()
      .update()
      .set({
        regionName: data.regionName,
        regionPic: data.regionPic,
      })
      .where('regionId = :id', { id })
      .execute();
  }

  async createRegion(regions: Regions): Promise<Regions> {
    return this.regionsRepo.save(this.regionsRepo.create(regions));
  }

  async findOneRegion(id: any): Promise<any> {
    return await this.regionsRepo.findOneBy({ regionId: id });
  }

  async removeRegion(id: any): Promise<any> {
    await this.regionsRepo.delete({ regionId: id });
    return 'data di hapus';
  }

  async storeFileInfo(
    file: {
      // filename: string;
      originalname: string;
    },
    body: any,
  ) {
    const fileInfo = new Regions();
    fileInfo.regionName = body.regionName;
    fileInfo.regionPic = `public/uploads/${file.originalname}`;

    await this.regionsRepo.save(fileInfo);
  }
}
