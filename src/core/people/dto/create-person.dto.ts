import { Prisma } from '@prisma/client'
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator'
import { IsUnique } from 'src/common/validators/unique.validator'

export class CreatePersonDto
  implements Omit<Prisma.PersonCreateManyInput, 'id'>
{
  @IsEmail()
  @IsUnique('person', 'email')
  email: string

  @IsNotEmpty()
  @IsString()
  firstName: string

  @IsString()
  @IsOptional()
  secondName?: string

  @IsNotEmpty()
  @IsString()
  firstSurname: string

  @IsString()
  @IsOptional()
  secondSurname?: string

  @IsOptional()
  @IsBoolean()
  active?: boolean

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  phoneNumbers: string[]
}
