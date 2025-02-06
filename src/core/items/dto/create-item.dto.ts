import { Prisma } from '@prisma/client'
import { IsPositive } from 'class-validator'
import { EntityExists } from 'src/common/validators/entity-exists.validator'

export class CreateItemDto implements Omit<Prisma.ItemCreateManyInput, 'id'> {
  @IsPositive({ message: 'quantity must be a positive number' })
  quantity: number

  @IsPositive({ message: 'price must be a positive number' })
  price: number

  @IsPositive({ message: 'productId must be a positive number' })
  @EntityExists('product')
  productId: number

  @IsPositive({ message: 'saleId must be a positive number' })
  @EntityExists('sale')
  saleId: number
}
