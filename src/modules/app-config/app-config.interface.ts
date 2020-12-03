import joi from 'joi';

export interface AppConfigModuleOptions<TJoiObjectSchema = any> {
  load?: Array<() => Record<string, any>>;
  validationSchema?: joi.ObjectSchema<TJoiObjectSchema>;
}
