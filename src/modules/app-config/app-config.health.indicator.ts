import { HealthIndicator, HealthIndicatorResult, HealthCheckError } from '@nestjs/terminus';
import { AppConfigService } from './app-config.service';

export class AppConfigHealthIndicator extends HealthIndicator {
  constructor(private readonly appConfigService: AppConfigService) {
    super();
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    const isHealthy = true;
    const result = this.getStatus(key, isHealthy, {
      current: this.appConfigService.hello(),
    });

    if (isHealthy) {
      return result;
    }
    throw new HealthCheckError('Version check failed', result);
  }
}
