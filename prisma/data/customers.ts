import { Prisma } from '@prisma/client'

export const customers: Prisma.CustomerCreateManyInput[] = [
  {
    address: 'Calle Imabura y 6 de Diciembre',
    personId: 2,
    zoneId: 1,
  },
  {
    address: 'Av. 12 de Octubre y Cordero',
    personId: 3,
    zoneId: 2,
  },
]
