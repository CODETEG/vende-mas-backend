import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaModule } from './core/prisma/prisma.module'
import { PeopleModule } from './features/people/people.module'

@Module({
  imports: [PrismaModule, PeopleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
