import { Injectable } from '@nestjs/common'
import { CreatePaymentDto } from './dto/create-payment.dto'
import { UpdatePaymentDto } from './dto/update-payment.dto'
import { Payment } from '@prisma/client'
import { BaseService } from 'src/common/services/base.service'
import { PrismaService } from 'src/global/prisma/prisma.service'

@Injectable()
export class PaymentsService extends BaseService<
  Payment,
  CreatePaymentDto,
  UpdatePaymentDto
> {
  constructor(prismaService: PrismaService) {
    super(prismaService, 'payment')
  }
}
