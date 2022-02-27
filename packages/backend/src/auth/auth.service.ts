import { Injectable, UnauthorizedException } from '@nestjs/common';
import admin, { ServiceAccount } from 'firebase-admin';
import serviceAccount from './firebase-adminsdk-service-account-file.json';

@Injectable()
export class AuthService {
  private app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
  });
  public async validateToken(token: string) {
    try {
      const decodedIdToken = await this.app.auth().verifyIdToken(token);
      return decodedIdToken;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
