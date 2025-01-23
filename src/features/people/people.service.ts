import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/core/prisma/prisma.service'

@Injectable()
export class PeopleService {
  constructor(private prismaService: PrismaService) {}

  create() {
    return 'This action adds a new person'
  }

  async findAll() {
    return await this.prismaService.person.findMany()
  }

  findOne(id: number) {
    return `This action returns a #${id} person`
  }

  update(id: number) {
    return `This action updates a #${id} person`
  }

  remove(id: number) {
    return `This action removes a #${id} person`
  }
}
