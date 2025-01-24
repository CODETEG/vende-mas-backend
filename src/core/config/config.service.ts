import { Injectable } from '@nestjs/common'
import { IConfig } from '../types/config.interface'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class CustomConfigService {
  constructor(private configService: ConfigService) {}

  get env(): IConfig {
    return this.configService.get<IConfig>('APP')!
  }
}
