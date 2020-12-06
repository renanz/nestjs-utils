import { DynamicModule, Module, Provider } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppAwsModule, AppAwsService, APP_AWS_SERVICE } from '../app-aws';
import { APP_CONFIG_HEALTH_INDICATOR, APP_CONFIG_SERVICE } from './app-config.constants';
import { AppConfigHealthIndicator } from './app-config.health.indicator';
import { AppConfigModuleOptions } from './app-config.interface';
import { AppConfigService } from './app-config.service';

@Module({})
export class AppConfigModule {
  static forRoot<TJoiObjectSchema = any>(
    options: AppConfigModuleOptions<TJoiObjectSchema>,
  ): DynamicModule {
    const appConfigServiceProvider: Provider = {
      provide: APP_CONFIG_SERVICE,
      useFactory: (configService: ConfigService, appAwsService: AppAwsService) =>
        new AppConfigService(configService, appAwsService),
      inject: [ConfigService, APP_AWS_SERVICE],
    };

    const appConfigHealthIndicatorProvider: Provider = {
      provide: APP_CONFIG_HEALTH_INDICATOR,
      useClass: AppConfigHealthIndicator,
      inject: [APP_CONFIG_SERVICE],
    };

    return {
      module: AppConfigModule,
      imports: [
        ConfigModule.forRoot({
          load: options.load,
          validationSchema: options.validationSchema,
        }),
        AppAwsModule.forRoot(options.appAwsConfigModuleOptions),
      ],
      providers: [ConfigService, appConfigServiceProvider, appConfigHealthIndicatorProvider],
      exports: [ConfigService, APP_CONFIG_SERVICE, APP_CONFIG_HEALTH_INDICATOR],
    };
  }

  static forRootAsync<TJoiObjectSchema = any>(
    options: AppConfigModuleOptions<TJoiObjectSchema>,
  ): DynamicModule {
    return AppConfigModule.forRoot(options);
  }
}
