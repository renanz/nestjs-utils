import { DynamicModule, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { FirebaseAuthStrategy } from './firebase.strategy';

@Module({})
export class AppAuthModule {
  static forRoot(): DynamicModule {
    return {
      module: AppAuthModule,
      imports: [PassportModule],
      providers: [FirebaseAuthStrategy],
      exports: [FirebaseAuthStrategy],
    };
  }
}
