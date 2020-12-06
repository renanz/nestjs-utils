import joi from 'joi';
import { AppAwsModuleOptions } from '../app-aws';

export interface AppConfigModuleOptions<TJoiObjectSchema = any> {
  appAwsConfigModuleOptions: AppAwsModuleOptions;
  load?: (() => Record<string, any>)[];
  validationSchema?: joi.ObjectSchema<TJoiObjectSchema>;
}
