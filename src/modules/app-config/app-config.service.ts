import { ConfigService } from '@nestjs/config';

export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}
  hello() {
    return { name: 'AppConfigService', ...this.configService.get('hello') };
  }
}
