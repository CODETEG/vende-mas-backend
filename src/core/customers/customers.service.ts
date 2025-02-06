import { Injectable } from '@nestjs/common'
import { CreateCustomerDto } from './dto/create-customer.dto'
import { UpdateCustomerDto } from './dto/update-customer.dto'
import { Customer } from '@prisma/client'
import { PrismaService } from 'src/global/prisma/prisma.service'
import { BaseService } from 'src/common/services/base.service'

@Injectable()
export class CustomersService extends BaseService<
  Customer,
  CreateCustomerDto,
  UpdateCustomerDto
> {
  constructor(prismaService: PrismaService) {
    super(prismaService, 'customer')
  }
}
