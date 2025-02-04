import { Prisma } from '@prisma/client'
import { Type } from 'class-transformer'
import { IsBoolean, IsDate, IsNumber, IsOptional } from 'class-validator'
import { EntityExists } from 'src/common/validators/entity-exists.validator'

export class CreateEmployeeDto
  implements Omit<Prisma.EmployeeCreateManyInput, 'id'>
{
  @IsDate({ message: 'contractDate must be a date' })
  @Type(() => Date)
  contractDate: Date

  @IsBoolean({ message: 'active must be a boolean' })
  @IsOptional()
  @Type(() => Boolean)
  active?: boolean

  @IsNumber({}, { message: 'userId must be a number' })
  @EntityExists('user')
  userId: number
}
