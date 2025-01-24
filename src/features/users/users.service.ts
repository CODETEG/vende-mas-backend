import { HttpStatus, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { PrismaService } from 'src/core/prisma/prisma.service'
import { hashPassword } from 'src/shared/lib/encrypter'
import { DisplayableException } from 'src/core/exceptions/displayable.exception'

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await hashPassword(createUserDto.password)

    return await this.prismaService.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    })
  }

  async findAll() {
    return await this.prismaService.user.findMany({
      include: { person: true },
    })
  }

  async findOne(id: number) {
    const entity = await this.prismaService.user.findUnique({
      where: { id },
      include: { person: true },
    })

    if (!entity)
      throw new DisplayableException(
        `El usuario con id ${id} no existe`,
        HttpStatus.NOT_FOUND,
      )

    return entity
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id)

    if (updateUserDto.personId) {
      const alreadyExistPersonAssociated =
        await this.prismaService.user.findUnique({
          where: { id, personId: updateUserDto.personId },
        })

      if (alreadyExistPersonAssociated)
        throw new DisplayableException(
          'Ya existe un usuario asociado a esta persona',
          HttpStatus.CONFLICT,
        )
    }

    const hashedPassword =
      updateUserDto.password && (await hashPassword(updateUserDto.password))

    return await this.prismaService.user.update({
      where: { id },
      data: {
        ...updateUserDto,
        password: hashedPassword,
      },
    })
  }

  async remove(id: number) {
    await this.findOne(id)

    return await this.prismaService.user.update({
      where: { id },
      data: { active: false },
    })
  }
}
