import { Prisma } from '@prisma/client'
import { Type } from 'class-transformer'
import { IsDate, IsPositive } from 'class-validator'
import { EntityExists } from 'src/common/validators/entity-exists.validator'

export class CreateRouteDto implements Omit<Prisma.RouteCreateManyInput, 'id'> {
  @IsDate({ message: 'date must be a date' })
  @Type(() => Date)
  date: Date

  @IsPositive({ message: 'employeeId must be a positive number' })
  @EntityExists('employee')
  employeeId: number
}
