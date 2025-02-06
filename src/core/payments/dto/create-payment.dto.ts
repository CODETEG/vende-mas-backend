import { PaymentMethod, PaymentStatus, Prisma } from '@prisma/client'
import { Type } from 'class-transformer'
import { IsDate, IsEnum, IsPositive } from 'class-validator'
import { EntityExists } from 'src/common/validators/entity-exists.validator'

export class CreatePaymentDto
  implements Omit<Prisma.PaymentCreateManyInput, 'id'>
{
  @IsPositive({ message: 'amount must be a positive number' })
  amount: number

  @IsDate({ message: 'dateTime must be a Date' })
  @Type(() => Date)
  dateTime: Date

  @IsEnum(PaymentStatus)
  status: PaymentStatus

  @IsEnum(PaymentMethod)
  method: PaymentMethod

  @IsPositive({ message: 'collectionId must be a positive number' })
  @EntityExists('collection')
  collectionId: number
}
