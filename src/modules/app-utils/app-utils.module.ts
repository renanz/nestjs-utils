import { DynamicModule, Module } from '@nestjs/common';
import { FirebaseAdminCoreModule } from '@tfarras/nestjs-firebase-admin';
import { AppAuthModule } from '../app-auth';
import { AppCommonService } from '../app-common/app-common.service';
import { AppConfigModule, AppConfigService, APP_CONFIG_SERVICE } from '../app-config';
import { AppHealthModule } from '../app-health';
import { AppModulesOptions } from './app-utils.interface';

@Module({})
export class AppUtilsModule {
  static forRootAsync({ appConfigModuleOptions }: AppModulesOptions): DynamicModule {
    return {
      module: AppUtilsModule,
      imports: [
        AppConfigModule.forRoot(appConfigModuleOptions),
        AppHealthModule.forRoot({
          appConfigModuleOptions,
        }),
        FirebaseAdminCoreModule.forRootAsync({
          inject: [APP_CONFIG_SERVICE],
          imports: [AppConfigModule.forRoot(appConfigModuleOptions)],
          useFactory: (configService: AppConfigService) => configService.FirebaseAppOptions(),
        }),
        AppAuthModule.forRoot(),
      ],
      providers: [AppCommonService],
      exports: [AppConfigModule, AppHealthModule, AppCommonService, AppAuthModule],
    };
  }
}
