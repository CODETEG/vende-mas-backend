import { Type } from 'class-transformer'
import { IsDate, IsInt, IsPositive, Min } from 'class-validator'

export class AssignedDto {
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  @Min(1)
  userId: number

  @IsDate()
  @Type(() => Date)
  date: Date
}
