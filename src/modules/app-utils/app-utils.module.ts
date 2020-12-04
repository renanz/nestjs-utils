import { DynamicModule, Module } from '@nestjs/common';
import { AppConfigModule } from '../app-config';
import { AppHealthModule } from '../app-health';
import { AppModulesOptions } from './app-utils.interface';

@Module({})
export class AppUtilsModule {
  static forRoot({ appConfigModuleOptions }: AppModulesOptions): DynamicModule {
    return {
      module: AppUtilsModule,
      imports: [
        AppConfigModule.forRoot(appConfigModuleOptions),
        AppHealthModule.forRoot({
          appConfigModuleOptions,
        }),
      ],
      providers: [],
      exports: [AppConfigModule, AppHealthModule],
    };
  }

  static forRootAsync(options: AppModulesOptions): DynamicModule {
    return AppUtilsModule.forRoot(options);
  }
}
