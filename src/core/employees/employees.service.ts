import { HttpStatus, Injectable } from '@nestjs/common'
import { CreateEmployeeDto } from './dto/create-employee.dto'
import { UpdateEmployeeDto } from './dto/update-employee.dto'
import { PrismaService } from 'src/global/prisma/prisma.service'
import { Employee } from '@prisma/client'
import { BaseService } from 'src/common/services/base.service'
import { DisplayableException } from 'src/common/exceptions/displayable.exception'

@Injectable()
export class EmployeesService extends BaseService<
  Employee,
  CreateEmployeeDto,
  UpdateEmployeeDto
> {
  constructor(prismaService: PrismaService) {
    super(prismaService, 'employee')
  }

  async create(createDto: CreateEmployeeDto) {
    const alreadyExistUserAssociated =
      await this.prismaService.employee.findUnique({
        where: { userId: createDto.userId },
      })

    if (alreadyExistUserAssociated)
      throw new DisplayableException(
        'Ya existe un empleado asociada a este usuario',
        HttpStatus.CONFLICT,
      )

    return await this.prismaService.employee.create({ data: createDto })
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
}
