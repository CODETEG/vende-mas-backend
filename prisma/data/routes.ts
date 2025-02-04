import { Prisma } from '@prisma/client'

export const routes: Prisma.RouteCreateManyInput[] = [
  {
    date: new Date(),
    employeeId: 1,
  },
  {
    date: new Date(),
    employeeId: 1,
  },
  {
    date: new Date(),
    employeeId: 1,
  },
]
