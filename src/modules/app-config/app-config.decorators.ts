import { Inject } from '@nestjs/common';
import { APP_CONFIG_HEALTH_INDICATOR, APP_CONFIG_SERVICE } from './app-config.constants';

export const InjectAppConfigHealthIndicator = (): ParameterDecorator =>
  Inject(APP_CONFIG_HEALTH_INDICATOR);

export const InjectAppConfigService = (): ParameterDecorator => Inject(APP_CONFIG_SERVICE);
