import { HttpStatus, Injectable } from '@nestjs/common'
import { CreateCustomerDto } from './dto/create-customer.dto'
import { UpdateCustomerDto } from './dto/update-customer.dto'
import { Customer } from '@prisma/client'
import { PrismaService } from 'src/global/prisma/prisma.service'
import { BaseService } from 'src/common/services/base.service'
import { DisplayableException } from 'src/common/exceptions/displayable.exception'

@Injectable()
export class CustomersService extends BaseService<
  Customer,
  CreateCustomerDto,
  UpdateCustomerDto
> {
  constructor(prismaService: PrismaService) {
    super(prismaService, 'customer')
  }

  async create(createDto: CreateCustomerDto) {
    const alreadyExistUserAssociated =
      await this.prismaService.customer.findUnique({
        where: { personId: createDto.personId },
      })

    if (alreadyExistUserAssociated)
      throw new DisplayableException(
        'Ya existe un cliente asociada a esta persona',
        HttpStatus.CONFLICT,
      )

    return await this.prismaService.customer.create({ data: createDto })
  }

  async update(id: number, updateDto: UpdateCustomerDto) {
    await this.findOne(id)

    if (updateDto.personId) {
      const alreadyExistUserAssociated =
        await this.prismaService.customer.findUnique({
          where: { personId: updateDto.personId, NOT: { id } },
        })

      if (alreadyExistUserAssociated)
        throw new DisplayableException(
          'Ya existe un cliente asociada a esta persona',
          HttpStatus.CONFLICT,
        )
    }

    return await this.prismaService.customer.update({
      where: { id },
      data: updateDto,
    })
  }
}
