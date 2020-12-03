import { DynamicModule, Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { AppConfigModule } from '../app-config/app-config.module';
import { AppHealthService } from './app-health.service';

@Module({})
export class AppHealthModule {
  static forRoot(): DynamicModule {
    return {
      module: AppHealthModule,
      imports: [TerminusModule, AppConfigModule],
      providers: [AppHealthService],
      exports: [AppHealthService],
    };
  }
}
