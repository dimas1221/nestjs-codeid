import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Regions } from 'entities/Regions';
@Injectable()
export class RegionsService {
  constructor(
    @InjectRepository(Regions)
    private regionsRepo: Repository<Regions>,
  ) {}

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
}
