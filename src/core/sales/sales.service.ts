import { HttpStatus, Injectable } from '@nestjs/common'
import { CreateSaleDto } from './dto/create-sale.dto'
import { UpdateSaleDto } from './dto/update-sale.dto'
import { BaseService } from 'src/common/services/base.service'
import { PrismaService } from 'src/global/prisma/prisma.service'
import { Sale } from '@prisma/client'
import { DisplayableException } from 'src/common/exceptions/displayable.exception'

@Injectable()
export class SalesService extends BaseService<
  Sale,
  CreateSaleDto,
  UpdateSaleDto
> {
  constructor(prismaService: PrismaService) {
    super(prismaService, 'sale')
  }

  async remove(id: number) {
    const itemsAssociated = await this.prismaService.item.findFirst({
      where: { saleId: id },
    })

    if (itemsAssociated) {
      throw new DisplayableException(
        'Existen items asociados a esta venta',
        HttpStatus.BAD_REQUEST,
      )
    }

    return this.prismaService.sale.delete({ where: { id } })
  }
}
