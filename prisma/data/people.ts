import { Prisma } from '@prisma/client'

export const people: Prisma.PersonCreateManyInput[] = [
  {
    dni: '0707047643',
    firstName: 'Daniel',
    firstSurname: 'Zhu',
    email: 'dzhu2409@gmail.com',
  },
  {
    dni: '0700941503',
    firstName: 'Mariana',
    firstSurname: 'Marquez',
  },
]
