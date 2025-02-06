import { Prisma } from '@prisma/client'
import { IsPositive, IsString } from 'class-validator'
import { EntityExists } from 'src/common/validators/entity-exists.validator'

export class CreateCustomerDto
  implements Omit<Prisma.CustomerCreateManyInput, 'id'>
{
  @IsString({ message: 'address must be a string' })
  address: string

  @IsPositive({ message: 'personId must be a positive number' })
  @EntityExists('person')
  personId: number

  @IsPositive({ message: 'zoneId must be a positive number' })
  @EntityExists('zone')
  zoneId: number
}
