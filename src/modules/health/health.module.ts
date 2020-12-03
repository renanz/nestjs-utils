import { DynamicModule, Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { AppConfigModule } from '../app-config/app-config.module';
import { HealthController } from './health.controller';

@Module({})
export class HealthModule {
  static forRoot(): DynamicModule {
    return {
      module: HealthModule,
      imports: [TerminusModule, AppConfigModule],
      controllers: [HealthController],
    };
  }
}
