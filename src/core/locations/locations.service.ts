import { Injectable } from '@nestjs/common'
import { CreateLocationDto } from './dto/create-location.dto'
import { UpdateLocationDto } from './dto/update-location.dto'
import { BaseService } from 'src/common/services/base.service'
import { PrismaService } from 'src/global/prisma/prisma.service'

@Injectable()
export class LocationsService extends BaseService<
  Location,
  CreateLocationDto,
  UpdateLocationDto
> {
  constructor(prismaService: PrismaService) {
    super(prismaService, 'location')
  }
}
