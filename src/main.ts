import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger, ValidationPipe } from '@nestjs/common'
import { ResponseInterceptor } from './core/interceptor/response.interceptor'
import { GlobalExceptionFilter } from './core/filters/all-exception.filter'
import { useContainer } from 'class-validator'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  app.useGlobalInterceptors(app.get(ResponseInterceptor))
  app.useGlobalFilters(new GlobalExceptionFilter())
  useContainer(app.select(AppModule), { fallbackOnErrors: true })

  const port = process.env.PORT ?? 3000
  await app.listen(port)

  Logger.log(`Server running on port ${port}`, 'Bootstrap')
}

void bootstrap()
