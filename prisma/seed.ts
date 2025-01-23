import { Logger } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { people } from './data/people'
import { users } from './data/user'

const prisma = new PrismaClient()

const main = async () => {
  await prisma.person.createMany({
    data: people,
  })

  await prisma.user.createMany({
    data: users,
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    Logger.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
