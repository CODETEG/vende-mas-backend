import { HttpStatus, Injectable } from '@nestjs/common'
import { LoginDto } from './dto/login.dto'
import { PrismaService } from 'src/core/prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'
import { comparePassword } from 'src/shared/lib/encrypter'
import { DisplayableException } from 'src/core/exceptions/displayable.exception'
import { IJwtPayload } from './types/jwt-payload.interface'

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login({ username, password }: LoginDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        username,
      },
    })

    if (!user)
      throw new DisplayableException(
        'Usuario no encontrado',
        HttpStatus.NOT_FOUND,
      )

    const isPasswordValid = comparePassword(password, user.password)

    if (!isPasswordValid)
      throw new DisplayableException(
        'Creedenciales incorrectas',
        HttpStatus.UNAUTHORIZED,
      )

    return {
      token: this.createToken({ id: user.id, role: user.role }),
    }
  }

  private createToken = (payload: IJwtPayload) => {
    return this.jwtService.sign(payload)
  }
}
