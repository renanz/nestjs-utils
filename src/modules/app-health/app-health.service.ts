import {
  HealthCheckService,
  DNSHealthIndicator,
  TypeOrmHealthIndicator,
  MemoryHealthIndicator,
} from '@nestjs/terminus';
import { AppConfigHealthIndicator, InjectAppConfigHealthIndicator } from '../app-config';

export class AppHealthService {
  constructor(
    private readonly health: HealthCheckService,
    private readonly memory: MemoryHealthIndicator,
    private readonly db: TypeOrmHealthIndicator,
    private readonly dns: DNSHealthIndicator,
    @InjectAppConfigHealthIndicator()
    private readonly appConfig: AppConfigHealthIndicator,
  ) {}

  healthCheck() {
    return this.health.check([
      async () => this.memory.checkHeap('memory_heap', 3000 * 1024 * 1024),
      async () => this.memory.checkRSS('memory_rss', 3000 * 1024 * 1024),
      async () => await this.db.pingCheck('db', { timeout: 60000 }),
      async () => this.dns.pingCheck('google', 'https://google.com'),
      async () => this.appConfig.isHealthy('version'),
    ]);
  }
}
