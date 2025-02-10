import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { BaseService } from 'src/common/services/base.service'
import { PrismaService } from 'src/global/prisma/prisma.service'
import { Task } from '@prisma/client'
import { DisplayableException } from 'src/common/exceptions/displayable.exception'
import { AssignedDto } from './dto/assgined-dto'

@Injectable()
export class TasksService extends BaseService<
  Task,
  CreateTaskDto,
  UpdateTaskDto
> {
  constructor(prismaService: PrismaService) {
    super(prismaService, 'task')
  }

  async findAllByDateAndUserInRoute({ userId, date }: AssignedDto) {
    const employee = await this.prismaService.employee.findUnique({
      where: {
        userId,
      },
      select: {
        id: true,
      },
    })

    if (!employee?.id) throw new NotFoundException('Employee not found')

    const route = await this.prismaService.route.findFirst({
      where: {
        employeeId: employee.id,
        date,
      },
      select: {
        id: true,
      },
    })

    if (!route?.id)
      throw new DisplayableException(
        'El empleado no tiene ruta asignada para la fecha seleccionada',
        HttpStatus.NOT_FOUND,
      )

    const tasks = this.prismaService.task.findMany({
      where: {
        customer: {
          zone: {
            routeId: route.id,
          },
        },
      },
      include: {
        customer: {
          include: {
            person: true,
          },
        },
      },
    })

    return tasks
  }
}
