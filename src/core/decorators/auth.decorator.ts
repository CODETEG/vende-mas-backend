import { applyDecorators, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { UserRole } from '@prisma/client'
import { RoleProtected } from 'src/features/auth/decorators/role-protected.decorator'
import { UserRoleGuard } from 'src/features/auth/guards/user-role.guard'

export function Auth(...roles: UserRole[]) {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(AuthGuard('jwt'), UserRoleGuard),
  )
}
