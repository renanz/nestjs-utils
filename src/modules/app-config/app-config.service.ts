import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as admin from 'firebase-admin';
import { AppAwsService } from '../app-aws';

export class AppConfigService {
  constructor(
    private readonly configService: ConfigService,
    private readonly appAwsService: AppAwsService,
  ) {}

  get version(): string {
    Logger.warn('Missing app.version config object', 'AppConfigService');
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

  async FirebaseAppOptions(): Promise<admin.AppOptions> {
    const credential = await Promise.resolve(this.firebaseServiceAccount());
    return {
      credential: admin.credential.cert(credential),
      databaseURL: this.configService.get<string>('auth.databaseURL'),
    };
  }

  async firebaseServiceAccount(): Promise<admin.ServiceAccount> {
    if (!this.configService.get<any>('auth')) {
      throw new Error('Missing auth config object.');
    }
    let privateKey = this.configService.get<string>('auth.privateKey');
    if (!privateKey) {
      const { Body } = await this.appAwsService.getObject(
        this.configService.get<string>('auth.s3PrivateKey')!,
        this.configService.get<string>('auth.s3Bucket')!,
      );
      if (!Body) {
        throw new Error('File was not found on bucket');
      }
      privateKey = Body.toString();
    }
    return {
      clientEmail: this.configService.get<string>('auth.clientEmail'),
      projectId: this.configService.get<string>('auth.projectId'),
      privateKey,
    };
  }
}
