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
import { ZonesService } from './zones.service'
import { CreateZoneDto } from './dto/create-zone.dto'
import { UpdateZoneDto } from './dto/update-zone.dto'
import { PaginationDto } from 'src/common/dtos/pagination.dto'

@Controller('zones')
export class ZonesController {
  constructor(private readonly service: ZonesService) {}

  @Post()
  create(@Body() dto: CreateZoneDto) {
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
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateZoneDto) {
    return this.service.update(id, dto)
  }
}
