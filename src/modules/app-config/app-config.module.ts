import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfigHealthIndicator } from './app-config.health.indicator';
import { AppConfigService } from './app-config.service';

@Module({})
export class AppConfigModule {
  static forRoot(): DynamicModule {
    return {
      module: AppConfigModule,
      imports: [ConfigModule],
      providers: [ConfigService, AppConfigService],
      exports: [AppConfigService, AppConfigHealthIndicator],
    };
  }

  static forRootAsync(): DynamicModule {
    return AppConfigModule.forRoot();
  }
}
