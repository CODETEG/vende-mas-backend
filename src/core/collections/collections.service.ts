import { Injectable } from '@nestjs/common'
import { CreateCollectionDto } from './dto/create-collection.dto'
import { UpdateCollectionDto } from './dto/update-collection.dto'
import { BaseService } from 'src/common/services/base.service'
import { PrismaService } from 'src/global/prisma/prisma.service'
import { Collection } from '@prisma/client'

@Injectable()
export class CollectionsService extends BaseService<
  Collection,
  CreateCollectionDto,
  UpdateCollectionDto
> {
  constructor(prismaService: PrismaService) {
    super(prismaService, 'collection')
  }
}
