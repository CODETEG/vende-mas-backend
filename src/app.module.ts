import { Module } from '@nestjs/common'
import { PrismaModule } from './core/prisma/prisma.module'
import { PeopleModule } from './features/people/people.module'
import { UsersModule } from './features/users/users.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ResponseInterceptor } from './core/interceptor/response.interceptor'
import { IsUniqueConstraint } from './core/validators/unique.validator'
import { EntityExistsConstraint } from './core/validators/entity-exists.validator'
@Module({
  imports: [PrismaModule, PeopleModule, UsersModule],
  controllers: [AppController],
  providers: [
    AppService,
    ResponseInterceptor,
    IsUniqueConstraint,
    EntityExistsConstraint,
  ],
})
export class AppModule {}
