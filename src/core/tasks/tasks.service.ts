import { Injectable } from '@nestjs/common'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { BaseService } from 'src/common/services/base.service'
import { PrismaService } from 'src/global/prisma/prisma.service'
import { Task } from '@prisma/client'

@Injectable()
export class TasksService extends BaseService<
  Task,
  CreateTaskDto,
  UpdateTaskDto
> {
  constructor(prismaService: PrismaService) {
    super(prismaService, 'task')
  }
}
