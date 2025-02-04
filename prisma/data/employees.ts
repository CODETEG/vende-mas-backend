import { Prisma } from '@prisma/client'

export const employees: Prisma.EmployeeCreateManyInput[] = [
  { userId: 1, contractDate: new Date('2023-01-01') },
]
