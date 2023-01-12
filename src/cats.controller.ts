import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { CustomersService } from './customers.service';

// interface UpdateCustomers{
//     cust_name: string,
//     cust_city: string,
// }

@Controller('cats')
export class CatsController {
    constructor (private readonly customersService: CustomersService){}

    @Get('customers')
    findAll(){
        return this.customersService.findAll()
    }
    @Put(':id')
    async updatecustomers(@Param('id') id:string, @Body() body:any){
        const newCus: any = await this.customersService.updatecustomers(id,body)
        return "customer updated"
    }
}


