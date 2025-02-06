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
import { RoutesService } from './routes.service'
import { CreateRouteDto } from './dto/create-route.dto'
import { UpdateRouteDto } from './dto/update-route.dto'
import { PaginationDto } from 'src/common/dtos/pagination.dto'

@Controller('routes')
export class RoutesController {
  constructor(private readonly service: RoutesService) {}

  @Post()
  create(@Body() dto: CreateRouteDto) {
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
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateRouteDto) {
    return this.service.update(id, dto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id)
  }
}
