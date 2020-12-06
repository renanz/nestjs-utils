import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { FirebaseAuthStrategy as Strategy, FirebaseUser } from '@tfarras/nestjs-firebase-auth';
import { AuthUser } from './authentication.interface';

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(Strategy, 'firebase') {
  constructor() {
    super({
      extractor: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(
    payload: FirebaseUser & { roles?: { id: number; name: string }[] },
  ): Promise<AuthUser> {
    const user: AuthUser = {
      userId: payload.user_id,
      email: payload.email || '',
      clientId: payload.sub,
      roles: payload.roles,
    };
    Logger.log(JSON.stringify(user), 'FirebaseAuthStrategy');
    return user;
  }
}
