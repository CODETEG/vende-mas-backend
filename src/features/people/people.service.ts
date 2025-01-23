import { Injectable, Logger } from '@nestjs/common'
import { CreatePersonDto } from './dto/create-person.dto'
import { UpdatePersonDto } from './dto/update-person.dto'
import { PrismaService } from 'src/core/prisma/prisma.service'

@Injectable()
export class PeopleService {
  constructor(private prismaService: PrismaService) {}

  create(createPersonDto: CreatePersonDto) {
    Logger.log(createPersonDto)
    return 'This action adds a new person'
  }

  async findAll() {
    return await this.prismaService.person.findMany()
  }

  findOne(id: number) {
    return `This action returns a #${id} person`
  }

  update(id: number, updatePersonDto: UpdatePersonDto) {
    Logger.log(updatePersonDto)

    return `This action updates a #${id} person`
  }

  remove(id: number) {
    return `This action removes a #${id} person`
  }
}
