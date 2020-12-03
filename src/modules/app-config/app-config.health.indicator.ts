import { Injectable } from '@nestjs/common';
import { HealthIndicator, HealthIndicatorResult, HealthCheckError } from '@nestjs/terminus';

@Injectable()
export class AppConfigHealthIndicator extends HealthIndicator {
  constructor() {
    super();
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    const isHealthy = true;
    const result = this.getStatus(key, isHealthy, { hello: 'world' });

    if (isHealthy) {
      return result;
    }
    throw new HealthCheckError('Version check failed', result);
  }
}
