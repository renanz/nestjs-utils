import { Inject } from '@nestjs/common';
import { APP_HEALTH_SERVICE } from './app-health.constants';

export const InjectAppHealthService = (): ParameterDecorator => Inject(APP_HEALTH_SERVICE);
