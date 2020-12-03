import joi from 'joi';

export interface AppConfigModuleOptions<TJoiObjectSchema = any> {
  load?: () => Record<string, any>[];
  validationSchema?: joi.ObjectSchema<TJoiObjectSchema>;
}
