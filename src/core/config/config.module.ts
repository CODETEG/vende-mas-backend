import { Global, Module } from '@nestjs/common'
import { CustomConfigService } from './config.service'
import { ConfigModule } from '@nestjs/config'
import config, { configValidationSchema } from '../constants/config'

@Global()
@Module({
  providers: [CustomConfigService],
  exports: [CustomConfigService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validationSchema: configValidationSchema,
      load: [config],
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
  ],
})
export class CustomConfigModule {}
