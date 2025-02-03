import { Prisma } from '@prisma/client'

export const cities: Prisma.CityCreateManyInput[] = [
  {
    name: 'Ambato',
  },
  {
    name: 'Quito',
  },
  {
    name: 'Puyo',
  },
]
