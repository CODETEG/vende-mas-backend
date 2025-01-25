import { HttpStatus, Injectable } from '@nestjs/common'
import { LoginDto } from './dto/login.dto'
import { JwtService } from '@nestjs/jwt'
import { IJwtPayload } from './types/jwt-payload.interface'
import { DisplayableException } from 'src/common/exceptions/displayable.exception'
import { comparePassword } from 'src/common/utils/encrypter'
import { PrismaService } from 'src/global/prisma/prisma.service'

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
