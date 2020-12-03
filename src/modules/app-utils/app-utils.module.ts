import { DynamicModule, Module } from '@nestjs/common';
import { CommonService } from '../common';
import { AppConfigModule } from '../app-config';
import { AppHealthModule } from '../app-health';

@Module({})
export class AppUtilsModule {
  static forRoot(): DynamicModule {
    return {
      module: AppUtilsModule,
      imports: [AppHealthModule, AppConfigModule],
      providers: [CommonService],
      exports: [CommonService],
    };
  }

  static forRootAsync(): DynamicModule {
    return AppUtilsModule.forRoot();
  }
}
