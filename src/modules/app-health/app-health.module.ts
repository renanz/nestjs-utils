import { DynamicModule, Module, Provider } from '@nestjs/common';
import {
  TerminusModule,
  HealthCheckService,
  DNSHealthIndicator,
  TypeOrmHealthIndicator,
  MemoryHealthIndicator,
} from '@nestjs/terminus';
import { AppConfigHealthIndicator } from '../app-config';
import { AppConfigModule } from '../app-config/app-config.module';
import { AppHealthModuleOptions } from './app-health.interface';
import { AppHealthService } from './app-health.service';

@Module({})
export class AppHealthModule {
  static forRoot(options: AppHealthModuleOptions): DynamicModule {
    const appHealthServiceProvider: Provider = {
      provide: AppHealthService,
      useFactory: (
        health: HealthCheckService,
        memory: MemoryHealthIndicator,
        db: TypeOrmHealthIndicator,
        dns: DNSHealthIndicator,
        appConfig: AppConfigHealthIndicator,
      ) => new AppHealthService(health, memory, db, dns, appConfig),
      inject: [
        HealthCheckService,
        MemoryHealthIndicator,
        TypeOrmHealthIndicator,
        DNSHealthIndicator,
        AppConfigHealthIndicator,
      ],
    };

    return {
      module: AppHealthModule,
      imports: [
        TerminusModule,
        AppConfigModule.forRoot(options.appConfigModuleOptions),
      ],
      providers: [appHealthServiceProvider],
      exports: [AppHealthService],
    };
  }
}
