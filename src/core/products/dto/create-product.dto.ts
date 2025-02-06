import { Prisma } from '@prisma/client'
import { IsOptional, IsPositive, IsString } from 'class-validator'
import { IsUnique } from 'src/common/validators/unique.validator'

export class CreateProductDto
  implements Omit<Prisma.ProductCreateManyInput, 'id'>
{
  @IsString({ message: 'name must be a string' })
  @IsUnique('product', 'name')
  name: string

  @IsOptional()
  @IsString({ message: 'description must be a string' })
  description?: string

  @IsPositive({ message: 'price must be a positive number' })
  price: number

  @IsPositive({ message: 'stock must be a positive number' })
  stock: number
}
