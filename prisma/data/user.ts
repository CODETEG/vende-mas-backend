import { Prisma, UserRole } from '@prisma/client'

export const users: Prisma.UserCreateManyInput[] = [
  {
    username: 'chu2409',
    password: '123456',
    role: UserRole.ADMIN,
    personId: 1,
  },
]
