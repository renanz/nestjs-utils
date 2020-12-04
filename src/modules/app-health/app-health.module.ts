import { DynamicModule, Module, Provider } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { AppConfigModule } from '../app-config/app-config.module';
import { APP_HEALTH_SERVICE } from './app-health.constants';
import { AppHealthModuleOptions } from './app-health.interface';
import { AppHealthService } from './app-health.service';

@Module({})
export class AppHealthModule {
  static forRoot(options: AppHealthModuleOptions): DynamicModule {
    const appHealthServiceProvider: Provider = {
      provide: APP_HEALTH_SERVICE,
      useClass: AppHealthService,
    };

    return {
      module: AppHealthModule,
      imports: [TerminusModule, AppConfigModule.forRoot(options.appConfigModuleOptions)],
      providers: [appHealthServiceProvider],
      exports: [APP_HEALTH_SERVICE],
    };
  }
}
