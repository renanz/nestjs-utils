import joi from 'joi';

export interface AppAwsConfigModuleOptions<TJoiObjectSchema = any> {
  load?: (() => Record<string, any>)[];
  validationSchema?: joi.ObjectSchema<TJoiObjectSchema>;
}
