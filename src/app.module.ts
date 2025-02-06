import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ResponseInterceptor } from './common/interceptors/response.interceptor'
import { EntityExistsConstraint } from './common/validators/entity-exists.validator'
import { IsUniqueConstraint } from './common/validators/unique.validator'
import { AuthModule } from './core/auth/auth.module'
import { PeopleModule } from './core/people/people.module'
import { UsersModule } from './core/users/users.module'
import { CustomConfigService } from './global/config/config.service'
import { PrismaService } from './global/prisma/prisma.service'
import { CustomConfigModule } from './global/config/config.module'
import { PrismaModule } from './global/prisma/prisma.module'
import { EmployeesModule } from './core/employees/employees.module'
import { CustomersModule } from './core/customers/customers.module'
import { CitiesModule } from './core/cities/cities.module'
import { RoutesModule } from './core/routes/routes.module'
import { ZonesModule } from './core/zones/zones.module'
import { ProductsModule } from './core/products/products.module'
import { TasksModule } from './core/tasks/tasks.module'
import { SalesModule } from './core/sales/sales.module'
import { PaymentsModule } from './core/payments/payments.module'
import { LocationsModule } from './core/locations/locations.module'
import { CommentsModule } from './core/comments/comments.module'
import { ItemsModule } from './core/items/items.module'
import { CollectionsModule } from './core/collections/collections.module'
@Module({
  imports: [
    PeopleModule,
    UsersModule,
    AuthModule,
    CustomConfigModule,
    PrismaModule,
    EmployeesModule,
    CustomersModule,
    CitiesModule,
    RoutesModule,
    ZonesModule,
    ProductsModule,
    TasksModule,
    SalesModule,
    CollectionsModule,
    ItemsModule,
    CommentsModule,
    LocationsModule,
    PaymentsModule,
  ],
  providers: [
    AppService,
    ResponseInterceptor,
    IsUniqueConstraint,
    EntityExistsConstraint,
    PrismaService,
    CustomConfigService,
  ],
  controllers: [AppController],
})
export class AppModule {}
