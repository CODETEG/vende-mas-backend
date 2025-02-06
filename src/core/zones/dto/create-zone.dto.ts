import { Prisma } from '@prisma/client'
import { IsOptional, IsPositive, IsString } from 'class-validator'
import { EntityExists } from 'src/common/validators/entity-exists.validator'
import { IsUnique } from 'src/common/validators/unique.validator'

export class CreateZoneDto implements Omit<Prisma.ZoneCreateManyInput, 'id'> {
  @IsString({ message: 'name must be a string' })
  @IsUnique('zone', 'name')
  name: string

  @IsOptional()
  @IsString({ message: 'description must be a string' })
  description?: string

  @IsPositive({ message: 'cityId must be a positive number' })
  @EntityExists('city')
  cityId: number

  @IsPositive({ message: 'routeId must be a positive number' })
  @EntityExists('route')
  routeId: number
}
