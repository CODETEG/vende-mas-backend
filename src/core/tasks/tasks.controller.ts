import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common'
import { TasksService } from './tasks.service'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { PaginationDto } from 'src/common/dtos/pagination.dto'
import { AssignedDto } from './dto/assgined-dto'

@Controller('tasks')
export class TasksController {
  constructor(private readonly service: TasksService) {}

  @Get('assigned')
  findAllByDateAndUserInRoute(@Query() dto: AssignedDto) {
    return this.service.findAllByDateAndUserInRoute(dto)
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id)
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTaskDto) {
    return this.service.update(id, dto)
  }

  @Post()
  create(@Body() dto: CreateTaskDto) {
    return this.service.create(dto)
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.service.findAll(paginationDto)
  }
}
