import { Prisma } from '@prisma/client'

export const zones: Prisma.ZoneCreateManyInput[] = [
  {
    name: 'La Joya',
    cityId: 1,
    routeId: 1,
  },
  {
    name: 'La Paz',
    cityId: 1,
    routeId: 1,
  },
  {
    name: 'La Merced',
    cityId: 2,
    routeId: 2,
  },
  {
    name: 'La Mariscal',
    cityId: 2,
    routeId: 2,
  },
  {
    name: 'La Victoria',
    cityId: 3,
    routeId: 3,
  },
]
