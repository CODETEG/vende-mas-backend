import { Body, Controller, Get, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { Auth } from 'src/core/decorators/auth.decorator'
import { UserRole } from '@prisma/client'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto)
  }

  @Get('profile')
  @Auth(UserRole.USER)
  getProfile() {
    return 'Profile'
  }
}
