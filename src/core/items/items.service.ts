import { Injectable } from '@nestjs/common'
import { CreateItemDto } from './dto/create-item.dto'
import { UpdateItemDto } from './dto/update-item.dto'
import { BaseService } from 'src/common/services/base.service'
import { Item } from '@prisma/client'
import { PrismaService } from 'src/global/prisma/prisma.service'

@Injectable()
export class ItemsService extends BaseService<
  Item,
  CreateItemDto,
  UpdateItemDto
> {
  constructor(prismaService: PrismaService) {
    super(prismaService, 'item')
  }
}
