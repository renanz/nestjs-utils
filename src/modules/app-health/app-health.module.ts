import { DynamicModule, Module, Provider } from '@nestjs/common';
import {
  HealthCheckService,
  DNSHealthIndicator,
  TypeOrmHealthIndicator,
  MemoryHealthIndicator,
  TerminusModule,
} from '@nestjs/terminus';
import { AppConfigHealthIndicator, APP_CONFIG_HEALTH_INDICATOR } from '../app-config';
import { AppConfigModule } from '../app-config/app-config.module';
import { APP_HEALTH_SERVICE } from './app-health.constants';
import { AppHealthModuleOptions } from './app-health.interface';
import { AppHealthService } from './app-health.service';

@Module({})
export class AppHealthModule {
  static forRoot(options: AppHealthModuleOptions): DynamicModule {
    const appHealthServiceProvider: Provider = {
      provide: APP_HEALTH_SERVICE,
      useFactory: (
        health: HealthCheckService,
        memory: MemoryHealthIndicator,
        db: TypeOrmHealthIndicator,
        dns: DNSHealthIndicator,
        appConfigHealthIndicator: AppConfigHealthIndicator,
      ) => new AppHealthService(health, memory, db, dns, appConfigHealthIndicator),
      inject: [
        HealthCheckService,
        MemoryHealthIndicator,
        TypeOrmHealthIndicator,
        DNSHealthIndicator,
        APP_CONFIG_HEALTH_INDICATOR,
      ],
    };

    return {
      module: AppHealthModule,
      imports: [TerminusModule, AppConfigModule.forRoot(options.appConfigModuleOptions)],
      providers: [appHealthServiceProvider],
      exports: [APP_HEALTH_SERVICE],
    };
  }
}
