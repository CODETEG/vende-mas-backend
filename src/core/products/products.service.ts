import { Injectable } from '@nestjs/common'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { PrismaService } from 'src/global/prisma/prisma.service'
import { Product } from '@prisma/client'
import { BaseService } from 'src/common/services/base.service'

@Injectable()
export class ProductsService extends BaseService<
  Product,
  CreateProductDto,
  UpdateProductDto
> {
  constructor(prismaService: PrismaService) {
    super(prismaService, 'product')
  }
}
