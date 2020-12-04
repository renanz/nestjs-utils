import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get version(): string {
    Logger.warn('Missing app.version config object');
    return this.configService.get<string>('app.version') || 'Version not provided';
  }

  get TypeOrmDatabase(): TypeOrmModuleOptions {
    if (!this.configService.get<any>('db')) {
      throw new Error('Missing db config object.');
    }
    return {
      type: this.configService.get<any>('db.connection'),
      host: this.configService.get<string>('db.host'),
      port: this.configService.get<number>('db.port'),
      username: this.configService.get<string>('db.user'),
      password: this.configService.get<string>('db.password'),
      database: this.configService.get<string>('db.name'),
      entities: [this.typeOrmEntities],
      logging: this.configService.get<string>('db.logging') === 'true',
      extra: { max: 4, min: 1 },
      synchronize: this.configService.get<string>('db.synchronize') === 'true',
    };
  }

  get typeOrmEntities(): string {
    const entities = this.configService.get<string>('db.entities');
    if (!entities) throw new Error('Missing entities folder location');
    return entities;
  }
}
