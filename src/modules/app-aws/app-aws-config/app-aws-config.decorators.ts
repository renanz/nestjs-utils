import { Inject } from '@nestjs/common';
import { APP_AWS_CONFIG_SERVICE } from './app-aws-config.constants';

export const InjectAppAwsConfigService = (): ParameterDecorator => Inject(APP_AWS_CONFIG_SERVICE);
