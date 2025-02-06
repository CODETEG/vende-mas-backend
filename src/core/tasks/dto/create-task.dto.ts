import { Prisma, TaskStatus, TaskType } from '@prisma/client'
import { Type } from 'class-transformer'
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsOptional,
  IsPositive,
} from 'class-validator'
import { EntityExists } from 'src/common/validators/entity-exists.validator'

export class CreateTaskDto implements Omit<Prisma.TaskCreateManyInput, 'id'> {
  @IsEnum(TaskType)
  type: TaskType

  @IsEnum(TaskStatus)
  status: TaskStatus

  @IsOptional()
  @IsDate({ message: 'completionDate must be a Date' })
  @Type(() => Date)
  completionDate?: Date

  @IsOptional()
  @IsDate({ message: 'assignedDate must be a Date' })
  @Type(() => Date)
  assignedDate?: Date

  @IsOptional()
  @IsBoolean({ message: 'priority must be a boolean' })
  priority?: boolean

  @IsPositive({ message: 'customerId must be a positive number' })
  @EntityExists('customer')
  customerId: number

  @IsOptional()
  @IsPositive({ message: 'employeeId must be a positive number' })
  @EntityExists('employee')
  completedByEmployeeId?: number
}
