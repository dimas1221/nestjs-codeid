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
import { CustomersService } from './customers.service';
import { AuthGuard } from '../auth/auth.guard';
import { Customers } from 'entities/Customers';

// interface UpdateCustomers{
//     cust_name: string,
//     cust_city: string,
// }

@Controller('cats')
// @UseGuards(AuthGuard)
export class CatsController {
  constructor(private readonly customersService: CustomersService) {}
  @Get('customers')
  findAll() {
    return this.customersService.findAll();
  }
  @Put(':id')
  async updatecustomers(@Param('id') id: string, @Body() body: any) {
    const newCus: any = await this.customersService.updatecustomers(id, body);
    return 'customer updated';
  }

  @Post('createcus')
  async create(@Body() createCusTo: Customers) {
    const cus = await this.customersService.createCus(createCusTo);
    if (!cus) {
      return 'error in creating ';
    }
    return 'data customers created';
  }

  @Get(':id')
  async findOne(@Param() params) {
    return await this.customersService.findOneCust(params.id);
  }

  @Delete(':id')
  async removeCust(@Param('id') id: any) {
    return await this.customersService.removeCust(id);
  }
}
