import { Prisma } from '@prisma/client'
import { IsDate, IsOptional, IsPositive } from 'class-validator'
import { EntityExists } from 'src/common/validators/entity-exists.validator'

export class CreateCollectionDto
  implements Omit<Prisma.CollectionCreateManyInput, 'id'>
{
  @IsDate({ message: 'dueDate must be a Date' })
  dueDate: Date

  @IsPositive({ message: 'saleId must be a positive number' })
  @EntityExists('sale')
  saleId: number

  @IsOptional()
  @IsPositive({ message: 'taskId must be a positive number' })
  @EntityExists('task')
  taskId?: number
}
