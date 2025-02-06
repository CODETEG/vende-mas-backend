import { Prisma } from '@prisma/client'
import { Type } from 'class-transformer'
import { IsDate, IsOptional, IsPositive, IsString } from 'class-validator'
import { EntityExists } from 'src/common/validators/entity-exists.validator'

export class CreateCommentDto
  implements Omit<Prisma.CommentCreateManyInput, 'id'>
{
  @IsString({ message: 'content must be a string' })
  content: string

  @IsDate({ message: 'dateTime must be a Date' })
  @Type(() => Date)
  dateTime: Date

  @IsOptional()
  @IsPositive({ message: 'commentId must be a positive number' })
  @EntityExists('comment')
  commentId?: number

  @IsPositive({ message: 'taskId must be a positive number' })
  @EntityExists('task')
  taskId: number

  @IsPositive({ message: 'employeeId must be a positive number' })
  @EntityExists('employee')
  employeeId: number
}
