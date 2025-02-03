import { Prisma } from '@prisma/client'

export const products: Prisma.ProductCreateManyInput[] = [
  {
    name: 'Product 1',
    price: 100,
    stock: 10,
  },
  {
    name: 'Product 2',
    price: 200,
    stock: 20,
  },
  {
    name: 'Product 3',
    price: 300,
    stock: 30,
  },
]
