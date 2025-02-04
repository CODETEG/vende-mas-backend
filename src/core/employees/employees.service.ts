import { HttpStatus, Injectable } from '@nestjs/common'
import { CreateEmployeeDto } from './dto/create-employee.dto'
import { UpdateEmployeeDto } from './dto/update-employee.dto'
import { PrismaService } from 'src/global/prisma/prisma.service'
import { PaginationDto } from 'src/common/dtos/pagination.dto'
import { IApiPaginatedRes } from 'src/common/types/api-response.interface'
import { Employee } from '@prisma/client'
import { DisplayableException } from 'src/common/exceptions/displayable.exception'

@Injectable()
export class EmployeesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    return await this.prismaService.employee.create({
      data: createEmployeeDto,
    })
  }

  async findAll({
    limit,
    page,
  }: PaginationDto): Promise<IApiPaginatedRes<Employee>> {
    const [entities, total] = await Promise.all([
      this.prismaService.employee.findMany({
        take: limit,
        skip: (page - 1) * limit,
      }),
      this.prismaService.employee.count(),
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
        `El empleado con id ${id} no existe`,
        HttpStatus.NOT_FOUND,
      )

    return entity
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    await this.findOne(id)

    if (updateEmployeeDto.userId) {
      const alreadyExistUserAssociated =
        await this.prismaService.employee.findUnique({
          where: { userId: updateEmployeeDto.userId, NOT: { id } },
        })

      if (alreadyExistUserAssociated)
        throw new DisplayableException(
          'Ya existe un empleado asociada a este usuario',
          HttpStatus.CONFLICT,
        )
    }

    return await this.prismaService.employee.update({
      where: { id },
      data: updateEmployeeDto,
    })
  }

  async remove(id: number) {
    await this.findOne(id)

    return await this.prismaService.user.update({
      where: { id },
      data: { active: false },
    })
  }
}
