import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { AppConfigModule } from '../app-config/app-config.module';
import { HealthController } from './health.controller';

@Module({
  imports: [TerminusModule, AppConfigModule],
  controllers: [HealthController],
})
export class HealthModule {}
