import { DynamicModule, Module, Provider } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_AWS_CONFIG_SERVICE } from './app-aws-config.constants';
import { AppAwsConfigModuleOptions } from './app-aws-config.interface';
import { AppAwsConfigService } from './app-aws-config.service';

@Module({})
export class AppAwsConfigModule {
  static forRoot<TJoiObjectSchema = any>(
    options: AppAwsConfigModuleOptions<TJoiObjectSchema>,
  ): DynamicModule {
    const appAwsConfigServiceProvider: Provider = {
      provide: APP_AWS_CONFIG_SERVICE,
      useFactory: (configService: ConfigService) => new AppAwsConfigService(configService),
      inject: [ConfigService],
    };

    return {
      module: AppAwsConfigModule,
      imports: [
        ConfigModule.forRoot({
          load: options.load,
          validationSchema: options.validationSchema,
        }),
      ],
      providers: [ConfigService, appAwsConfigServiceProvider],
      exports: [ConfigService, APP_AWS_CONFIG_SERVICE],
    };
  }
}
