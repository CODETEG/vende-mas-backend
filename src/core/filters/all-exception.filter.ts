import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { Prisma } from '@prisma/client'
import { IApiResponse } from '../types/api-response.interface'

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    let status = HttpStatus.INTERNAL_SERVER_ERROR
    const errorResponse: IApiResponse<null> = {
      success: false,
      data: null,
      message: {
        content: ['Ocurrió un error inesperado'],
        displayable: false,
      },
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { exception: _, ...rest } = exception

    Logger.error({
      exception: rest,
      path: request.url,
      method: request.method,
      timestamp: new Date().toLocaleString(),
    })

    // Handle HttpExceptions
    if (exception instanceof HttpException) {
      status = exception.getStatus()
      const errorMessage = exception.getResponse()

      errorResponse.message.content = Array.isArray(errorMessage['message'])
        ? errorMessage['message']
        : [errorMessage['message'] || 'HTTP Error']
    }
    // Handle Prisma specific errors
    else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      status = HttpStatus.BAD_REQUEST

      switch (exception.code) {
        case 'P2002': // Unique constraint violation
          errorResponse.message.content = [
            'Unique constraint violation on field',
          ]
          break
        case 'P2003': // Foreign key constraint violation
          errorResponse.message.content = ['Invalid related record']
          break
        case 'P2025': // Record not found
          status = HttpStatus.NOT_FOUND
          errorResponse.message.content = ['Record not found']
          break
        default:
          errorResponse.message.content = ['Database operation error']
      }
    }
    // Handle other types of errors
    else if (exception instanceof Error) {
      errorResponse.message.content = [exception.message]
    }

    response.status(status).json(errorResponse)
  }
}
