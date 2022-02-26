import { Strategy } from 'passport-http-bearer';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { getAuth } from 'firebase-admin/auth';

@Injectable()
export class FirebaseStrategy extends PassportStrategy(Strategy) {
  async validate(token: string) {
    try {
      const decodedIdToken = await getAuth().verifyIdToken(token);
      return decodedIdToken;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
