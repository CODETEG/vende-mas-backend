import { Prisma, UserRole } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const encryptPassword = (password: string) => {
  return bcrypt.hashSync(password, 12)
}

export const users: Prisma.UserCreateManyInput[] = [
  {
    username: 'chu2409',
    password: encryptPassword('123456'),
    role: UserRole.ADMIN,
    personId: 1,
  },
]
