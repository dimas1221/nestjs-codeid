import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customers } from 'entities/Customers';

// export interface CustomersInterface{
//     custName: string,
//     custCity: string,
// }

@Injectable()
export class CustomersService {
    constructor (@InjectRepository(Customers)
    private customersRepository:Repository<Customers>,
    ){}
    async findAll():Promise<any>{
        return await this.customersRepository.find();
    }

    async updatecustomers(id:string, data: Customers):Promise<any>{
        return this.customersRepository
        .createQueryBuilder()
        .update()
        .set({
            custName: data.custName,
            custCity: data.custCity,
        })
        .where('custId = :id', {id})
        .execute()
    }
}
