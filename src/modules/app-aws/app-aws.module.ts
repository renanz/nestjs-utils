import { DynamicModule, Module, Provider } from '@nestjs/common';
import { AppAwsConfigModule, APP_AWS_CONFIG_SERVICE } from './app-aws-config';
import { APP_AWS_SERVICE } from './app-aws.constants';
import { AppAwsModuleOptions } from './app-aws.interface';
import { AppAwsService } from './app-aws.service';

@Module({})
export class AppAwsModule {
  static forRoot(options: AppAwsModuleOptions): DynamicModule {
    const appAwsServiceProvider: Provider = {
      provide: APP_AWS_SERVICE,
      useClass: AppAwsService,
      inject: [APP_AWS_CONFIG_SERVICE],
    };

    return {
      module: AppAwsModule,
      imports: [AppAwsConfigModule.forRoot(options.appAwsConfigModuleOptions)],
      providers: [appAwsServiceProvider],
      exports: [APP_AWS_SERVICE],
    };
  }
}
