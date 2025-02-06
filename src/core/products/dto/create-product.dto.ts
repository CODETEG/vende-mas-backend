import { Prisma } from '@prisma/client'
import { IsOptional, IsPositive, IsString } from 'class-validator'

export class CreateProductDto
  implements Omit<Prisma.ProductCreateManyInput, 'id'>
{
  @IsString({ message: 'name must be a string' })
  name: string

  @IsOptional()
  @IsString({ message: 'description must be a string' })
  description?: string

  @IsPositive({ message: 'price must be a positive number' })
  price: number

  @IsPositive({ message: 'stock must be a positive number' })
  stock: number
}
