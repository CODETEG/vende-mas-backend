import { HttpStatus, Injectable } from '@nestjs/common'
import { CreateRouteDto } from './dto/create-route.dto'
import { UpdateRouteDto } from './dto/update-route.dto'
import { BaseService } from 'src/common/services/base.service'
import { Route } from '@prisma/client'
import { PrismaService } from 'src/global/prisma/prisma.service'
import { DisplayableException } from 'src/common/exceptions/displayable.exception'

@Injectable()
export class RoutesService extends BaseService<
  Route,
  CreateRouteDto,
  UpdateRouteDto
> {
  constructor(prismaService: PrismaService) {
    super(prismaService, 'route')
  }

  async create(createDto: CreateRouteDto) {
    const existsRoute = await this.prismaService.route.findFirst({
      where: {
        date: createDto.date,
        employeeId: createDto.employeeId,
      },
    })

    if (existsRoute) {
      throw new DisplayableException(
        'Ya existe una ruta asignada en ese dia al empleado',
        HttpStatus.CONFLICT,
      )
    }

    return super.create(createDto)
  }

  async update(id: number, updateDto: UpdateRouteDto) {
    await this.findOne(id)

    const existsRoute = await this.prismaService.route.findFirst({
      where: {
        date: updateDto.date,
        employeeId: updateDto.employeeId,
      },
    })

    if (existsRoute) {
      throw new DisplayableException(
        'Ya existe una ruta asignada en ese dia al empleado',
        HttpStatus.CONFLICT,
      )
    }

    return super.update(id, updateDto)
  }

  async remove(id: number) {
    await this.findOne(id)

    const routesAssociated = await this.prismaService.zone.findFirst({
      where: {
        routeId: id,
      },
    })

    if (routesAssociated) {
      throw new DisplayableException(
        'No se puede eliminar la ruta porque tiene zonas asociadas',
        HttpStatus.CONFLICT,
      )
    }

    return await this.prismaService.route.delete({
      where: {
        id,
      },
    })
  }
}
