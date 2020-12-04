import { HealthIndicator, HealthIndicatorResult, HealthCheckError } from '@nestjs/terminus';
import { InjectAppConfigService } from './app-config.decorators';
import { AppConfigService } from './app-config.service';

export class AppConfigHealthIndicator extends HealthIndicator {
  constructor(
    @InjectAppConfigService()
    private readonly appConfigService: AppConfigService,
  ) {
    super();
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    const isHealthy = true;
    const result = this.getStatus(key, isHealthy, {
      currentVersion: this.appConfigService.version,
    });

    if (isHealthy) {
      return result;
    }
    throw new HealthCheckError('Version check failed', result);
  }
}
