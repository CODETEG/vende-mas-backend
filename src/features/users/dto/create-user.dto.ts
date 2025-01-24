import { Prisma, UserRole } from '@prisma/client'
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'
import { EntityExists } from 'src/core/validators/entity-exists.validator'
import { IsUnique } from 'src/core/validators/unique.validator'

export class CreateUserDto implements Omit<Prisma.UserCreateManyInput, 'id'> {
  @IsNotEmpty()
  @IsString()
  @IsUnique('user', 'username')
  username: string

  @IsNotEmpty()
  @IsString()
  password: string

  @IsOptional()
  @IsEnum(UserRole)
  role: UserRole

  @IsOptional()
  @IsBoolean()
  active?: boolean

  @IsNumber()
  @EntityExists('person')
  personId: number
}
