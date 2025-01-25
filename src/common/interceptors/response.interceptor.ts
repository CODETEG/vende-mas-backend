import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { map, Observable } from 'rxjs'
import { IApiResponse } from '../types/api-response.interface'
import { Reflector } from '@nestjs/core'
import { getApiMessage } from '../decorators/api-message.decorator'

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, IApiResponse<T>>
{
  constructor(private reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<IApiResponse<T>> | Promise<Observable<IApiResponse<T>>> {
    return next.handle().pipe(
      map((data) => {
        const message = getApiMessage(this.reflector, context)

        return {
          success: true,
          data: data || null,
          message,
        }
      }),
    )
  }
}
