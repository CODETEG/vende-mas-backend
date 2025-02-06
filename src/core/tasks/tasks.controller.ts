import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common'
import { TasksService } from './tasks.service'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { PaginationDto } from 'src/common/dtos/pagination.dto'

@Controller('tasks')
export class TasksController {
  constructor(private readonly service: TasksService) {}

  @Post()
  create(@Body() dto: CreateTaskDto) {
    return this.service.create(dto)
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.service.findAll(paginationDto)
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id)
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTaskDto) {
    return this.service.update(id, dto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id)
  }
}
