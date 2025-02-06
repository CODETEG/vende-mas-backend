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
import { ItemsService } from './items.service'
import { CreateItemDto } from './dto/create-item.dto'
import { UpdateItemDto } from './dto/update-item.dto'
import { PaginationDto } from 'src/common/dtos/pagination.dto'

@Controller('items')
export class ItemsController {
  constructor(private readonly service: ItemsService) {}

  @Post()
  create(@Body() dto: CreateItemDto) {
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
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateItemDto) {
    return this.service.update(id, dto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id)
  }
}
