import { Prisma } from '@prisma/client'
import { IsString } from 'class-validator'

export class CreateCityDto implements Omit<Prisma.CityCreateManyInput, 'id'> {
  @IsString({ message: 'name must be a string' })
  name: string
}
