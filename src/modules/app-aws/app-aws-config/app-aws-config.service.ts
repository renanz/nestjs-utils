import { ConfigService } from '@nestjs/config';

export class AppAwsConfigService {
  constructor(private configService: ConfigService) {
    if (!this.configService.get<any>('aws')) {
      throw new Error('Missing aws config object.');
    }
  }

  get secretAccessKey() {
    return this.configService.get<string>('aws.secretAccessKey');
  }

  get accessKeyId() {
    return this.configService.get<string>('aws.accessKeyId');
  }
}
