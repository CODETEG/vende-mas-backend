import { Injectable } from '@nestjs/common'
import { CreateZoneDto } from './dto/create-zone.dto'
import { UpdateZoneDto } from './dto/update-zone.dto'
import { BaseService } from 'src/common/services/base.service'
import { Zone } from '@prisma/client'
import { PrismaService } from 'src/global/prisma/prisma.service'

@Injectable()
export class ZonesService extends BaseService<
  Zone,
  CreateZoneDto,
  UpdateZoneDto
> {
  constructor(prismaService: PrismaService) {
    super(prismaService, 'zone')
  }
}
