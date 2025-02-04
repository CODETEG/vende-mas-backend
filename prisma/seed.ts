import { Logger } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { people } from './data/people'
import { users } from './data/user'
import { identifications } from './data/identifications'
import { employees } from './data/employees'
import { customers } from './data/customers'
import { cities } from './data/cities'
import { zones } from './data/zones'
import { products } from './data/products'
import { routes } from './data/routes'

const prisma = new PrismaClient()

const main = async () => {
  await prisma.person.createMany({
    data: people,
  })

  await prisma.identification.createMany({
    data: identifications,
  })

  await prisma.city.createMany({
    data: cities,
  })

  await prisma.user.createMany({
    data: users,
  })

  await prisma.employee.createMany({
    data: employees,
  })

  await prisma.route.createMany({
    data: routes,
  })

  await prisma.zone.createMany({
    data: zones,
  })

  await prisma.customer.createMany({
    data: customers,
  })

  await prisma.product.createMany({
    data: products,
  })

  Logger.log('Seed data created successfully')
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
