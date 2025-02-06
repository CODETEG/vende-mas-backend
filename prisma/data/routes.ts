import { Prisma } from '@prisma/client'

export const routes: Prisma.RouteCreateManyInput[] = [
  {
    date: new Date('2021-01-01'),
    employeeId: 1,
  },
  {
    date: new Date('2021-01-02'),
    employeeId: 1,
  },
  {
    date: new Date('2021-01-03'),
    employeeId: 1,
  },
]
