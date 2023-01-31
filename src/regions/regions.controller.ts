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
} from '@nestjs/common';
import { RegionsService } from './regions.service';
import { AuthGuard } from '../auth/auth.guard';
import { Regions } from 'entities/Regions';

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
}
