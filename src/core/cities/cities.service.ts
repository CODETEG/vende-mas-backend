import { Injectable } from '@nestjs/common'
import { CreateCityDto } from './dto/create-city.dto'
import { UpdateCityDto } from './dto/update-city.dto'
import { BaseService } from 'src/common/services/base.service'
import { City } from '@prisma/client'
import { PrismaService } from 'src/global/prisma/prisma.service'

@Injectable()
export class CitiesService extends BaseService<
  City,
  CreateCityDto,
  UpdateCityDto
> {
  constructor(prismaService: PrismaService) {
    super(prismaService, 'city')
  }
}
