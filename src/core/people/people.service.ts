import { HttpStatus, Injectable } from '@nestjs/common'
import { CreatePersonDto } from './dto/create-person.dto'
import { UpdatePersonDto } from './dto/update-person.dto'
import { Person } from '@prisma/client'
import { PaginationDto } from 'src/common/dtos/pagination.dto'
import { DisplayableException } from 'src/common/exceptions/displayable.exception'
import { IApiPaginatedRes } from 'src/common/types/api-response.interface'
import { PrismaService } from 'src/global/prisma/prisma.service'
@Injectable()
export class PeopleService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createPersonDto: CreatePersonDto) {
    return await this.prismaService.person.create({
      data: createPersonDto,
    })
  }

  async findAll({
    limit,
    page,
  }: PaginationDto): Promise<IApiPaginatedRes<Person>> {
    const [entities, total] = await Promise.all([
      this.prismaService.person.findMany({
        take: limit,
        skip: (page - 1) * limit,
      }),
      this.prismaService.person.count(),
    ])

    return {
      records: entities,
      total,
      limit,
      page,
      pages: Math.ceil(total / limit),
    }
  }

  async findOne(id: number) {
    const entity = await this.prismaService.person.findUnique({
      where: { id },
    })

    if (!entity)
      throw new DisplayableException(
        `La persona con id ${id} no existe`,
        HttpStatus.NOT_FOUND,
      )

    return entity
  }

  async update(id: number, updatePersonDto: UpdatePersonDto) {
    await this.findOne(id)

    return await this.prismaService.person.update({
      where: { id },
      data: updatePersonDto,
    })
  }

  async remove(id: number) {
    await this.findOne(id)

    return await this.prismaService.person.update({
      where: { id },
      data: { active: false },
    })
  }
}
