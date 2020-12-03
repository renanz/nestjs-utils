import { DynamicModule, Module, Provider } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfigHealthIndicator } from './app-config.health.indicator';
import { AppConfigModuleOptions } from './app-config.interface';
import { AppConfigService } from './app-config.service';

@Module({})
export class AppConfigModule {
  static forRoot<TJoiObjectSchema = any>(
    options: AppConfigModuleOptions<TJoiObjectSchema>,
  ): DynamicModule {
    const appConfigServiceProvider: Provider = {
      provide: AppConfigService,
      useFactory: (configService: ConfigService) =>
        new AppConfigService(configService),
      inject: [ConfigService],
    };

    const appConfigHealthIndicatorProvider: Provider = {
      provide: AppConfigHealthIndicator,
      useFactory: (configService: AppConfigService) =>
        new AppConfigHealthIndicator(configService),
      inject: [AppConfigService],
    };

    return {
      module: AppConfigModule,
      imports: [
        ConfigModule.forRoot({
          load: options.load,
          validationSchema: options.validationSchema,
        }),
      ],
      providers: [
        ConfigService,
        appConfigServiceProvider,
        appConfigHealthIndicatorProvider,
      ],
      exports: [ConfigService, AppConfigService, AppConfigHealthIndicator],
    };
  }

  static forRootAsync<TJoiObjectSchema = any>(
    options: AppConfigModuleOptions<TJoiObjectSchema>,
  ): DynamicModule {
    return AppConfigModule.forRoot(options);
  }
}
