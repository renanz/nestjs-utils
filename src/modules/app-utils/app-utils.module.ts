import { DynamicModule, Module } from '@nestjs/common';
import { CommonService } from '../common';
import { AppConfigModule, AppConfigService } from '../app-config';
import { AppHealthModule, AppHealthService } from '../app-health';

@Module({})
export class AppUtilsModule {
  static forRoot(): DynamicModule {
    return {
      module: AppUtilsModule,
      imports: [AppHealthModule.forRoot(), AppConfigModule.forRoot()],
      providers: [CommonService, AppHealthService, AppConfigService],
      exports: [CommonService, AppHealthService, AppConfigService],
    };
  }

  static forRootAsync(): DynamicModule {
    return AppUtilsModule.forRoot();
  }
}
