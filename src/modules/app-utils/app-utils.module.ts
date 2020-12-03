import { DynamicModule, Module } from '@nestjs/common';
import { CommonService } from '../common';
import { AppConfigModule } from '../app-config';
import { AppHealthModule, AppHealthService } from '../app-health';

@Module({})
export class AppUtilsModule {
  static forRoot(): DynamicModule {
    return {
      module: AppUtilsModule,
      imports: [AppHealthModule, AppConfigModule],
      providers: [CommonService, AppHealthService],
      exports: [CommonService, AppHealthService],
    };
  }

  static forRootAsync(): DynamicModule {
    return AppUtilsModule.forRoot();
  }
}
