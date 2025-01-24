import { BadRequestException, Injectable } from '@nestjs/common'
import { CreatePersonDto } from './dto/create-person.dto'
import { UpdatePersonDto } from './dto/update-person.dto'
import { PrismaService } from 'src/core/prisma/prisma.service'
@Injectable()
export class PeopleService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createPersonDto: CreatePersonDto) {
    return await this.prismaService.person.create({
      data: createPersonDto,
    })
  }

  async findAll() {
    return await this.prismaService.person.findMany()
  }

  async findOne(id: number) {
    const entity = await this.prismaService.person.findUnique({
      where: { id },
    })

    if (!entity)
      throw new BadRequestException(`Person with id ${id} does not exist`)

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
