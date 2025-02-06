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
import { PeopleService } from './people.service'
import { CreatePersonDto } from './dto/create-person.dto'
import { UpdatePersonDto } from './dto/update-person.dto'
import { PaginationDto } from 'src/common/dtos/pagination.dto'

@Controller('people')
export class PeopleController {
  constructor(private readonly service: PeopleService) {}

  @Post()
  create(@Body() dto: CreatePersonDto) {
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
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePersonDto) {
    return this.service.update(id, dto)
  }
}
