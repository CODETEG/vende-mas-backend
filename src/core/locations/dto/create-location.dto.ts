import { LocationType, Prisma } from '@prisma/client'
import { Type } from 'class-transformer'
import { IsDate, IsEnum, IsNumber, IsPositive } from 'class-validator'
import { EntityExists } from 'src/common/validators/entity-exists.validator'

export class CreateLocationDto
  implements Omit<Prisma.LocationCreateManyInput, 'id'>
{
  @IsEnum(LocationType)
  type: LocationType

  @IsNumber({}, { message: 'lat must be a number' })
  lat: number

  @IsNumber({}, { message: 'lng must be a number' })
  lng: number

  @IsDate({ message: 'dateTime must be a Date' })
  @Type(() => Date)
  dateTime: Date

  @IsPositive({ message: 'taskId must be a positive number' })
  @EntityExists('task')
  taskId: number
}
