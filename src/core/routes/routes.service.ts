import { Injectable } from '@nestjs/common'
import { CreateRouteDto } from './dto/create-route.dto'
import { UpdateRouteDto } from './dto/update-route.dto'
import { BaseService } from 'src/common/services/base.service'
import { Route } from '@prisma/client'
import { PrismaService } from 'src/global/prisma/prisma.service'

@Injectable()
export class RoutesService extends BaseService<
  Route,
  CreateRouteDto,
  UpdateRouteDto
> {
  constructor(prismaService: PrismaService) {
    super(prismaService, 'route')
  }
}
