import { Body, Controller, Get, HttpCode, Post, Request } from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignInDto } from './dto/sign-in.dto'
import { Auth } from 'src/core/auth/decorators/auth.decorator'

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('sign-in')
  @HttpCode(200)
  async signIn(@Body() dto: SignInDto) {
    return this.service.signIn(dto)
  }

  @Auth()
  @Get('me')
  getProfile(@Request() req) {
    const user = req.user

    return user
  }
}
