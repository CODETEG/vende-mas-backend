import { Reflector } from '@nestjs/core'
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { META_ROLES } from '../decorators/role-protected.decorator'
import { User, UserRole } from '@prisma/client'

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: UserRole[] | undefined = this.reflector.get(
      META_ROLES,
      context.getHandler(),
    )

    if (!validRoles) return true
    if (validRoles.length === 0) return true

    const req = context.switchToHttp().getRequest()
    const user: User | undefined = req.user

    if (!user) throw new BadRequestException('User not found')

    if (user.role === UserRole.ADMIN) return true
    if (validRoles.includes(user.role)) return true

    throw new ForbiddenException(
      `User ${user.username} need a valid role: [${validRoles.join(', ')}]`,
    )
  }
}
