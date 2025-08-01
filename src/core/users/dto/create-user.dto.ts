import { Prisma, UserRole } from '@prisma/client'
import { Type } from 'class-transformer'
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'
import { EntityExists } from 'src/common/validators/entity-exists.validator'
import { IsUnique } from 'src/common/validators/unique.validator'

export class CreateUserDto implements Omit<Prisma.UserCreateManyInput, 'id'> {
  @IsString({ message: 'username must be a string' })
  @IsUnique('user', 'username')
  username: string

  @IsString({ message: 'password must be a string' })
  password: string

  @IsOptional()
  @IsEnum(UserRole)
  role: UserRole

  @IsBoolean({ message: 'active must be a boolean' })
  @IsOptional()
  @Type(() => Boolean)
  active?: boolean

  @IsNumber({}, { message: 'personId must be a number' })
  @EntityExists('person')
  personId: number
}
