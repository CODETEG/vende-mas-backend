import { Body, Controller, Get, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignInDto } from './dto/sign-in.dto'
import { UserRole } from '@prisma/client'
import { Auth } from 'src/core/auth/decorators/auth.decorator'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  async signIn(@Body() dto: SignInDto) {
    return this.authService.signIn(dto)
  }

  @Get('profile')
  @Auth(UserRole.USER)
  getProfile() {
    return 'Profile'
  }
}
