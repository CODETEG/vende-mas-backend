import { Prisma } from '@prisma/client'
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator'
import { IsUnique } from 'src/core/validators/unique.validator'

export class CreatePersonDto
  implements Omit<Prisma.PersonCreateManyInput, 'id'>
{
  @IsNotEmpty()
  @IsString()
  @Length(9, 11, { message: 'dni must be between 9 and 11 characters' })
  @IsUnique('person', 'dni')
  dni: string

  @IsEmail()
  @IsOptional()
  email?: string

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
}
