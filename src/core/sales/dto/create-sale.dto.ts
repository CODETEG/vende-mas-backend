import { Prisma } from '@prisma/client'
import { Type } from 'class-transformer'
import { IsDate, IsOptional, IsPositive } from 'class-validator'
import { EntityExists } from 'src/common/validators/entity-exists.validator'

export class CreateSaleDto implements Omit<Prisma.SaleCreateManyInput, 'id'> {
  @IsDate({ message: 'dateTime must be a Date' })
  @Type(() => Date)
  dateTime: Date

  @IsPositive({ message: 'total must be a positive number' })
  total: number

  @IsOptional()
  @IsPositive({ message: 'outstanding must be a positive number' })
  outstanding?: number

  @IsOptional()
  @IsPositive({ message: 'taskId must be a positive number' })
  @EntityExists('task')
  taskId?: number
}
