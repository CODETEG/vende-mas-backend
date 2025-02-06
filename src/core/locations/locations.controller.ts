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
import { LocationsService } from './locations.service'
import { CreateLocationDto } from './dto/create-location.dto'
import { UpdateLocationDto } from './dto/update-location.dto'
import { PaginationDto } from 'src/common/dtos/pagination.dto'

@Controller('locations')
export class LocationsController {
  constructor(private readonly service: LocationsService) {}

  @Post()
  create(@Body() dto: CreateLocationDto) {
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
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateLocationDto,
  ) {
    return this.service.update(id, dto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id)
  }
}
