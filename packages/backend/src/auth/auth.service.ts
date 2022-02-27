import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import admin, { AppOptions, ServiceAccount } from 'firebase-admin';
import serviceAccount from './firebase-adminsdk-service-account-file.json';

@Injectable()
export class AuthService {
  private app: admin.app.App;
  constructor(private configService: ConfigService) {
    const FIREBASE_AUTH_EMULATOR_HOST = this.configService.get<string>(
      'FIREBASE_AUTH_EMULATOR_HOST',
    );
    const GCLOUD_PROJECT = this.configService.get<string>('GCLOUD_PROJECT');
    const useEmulator = !!(FIREBASE_AUTH_EMULATOR_HOST && GCLOUD_PROJECT);
    const options: AppOptions = useEmulator
      ? {
          projectId: GCLOUD_PROJECT,
        }
      : {
          credential: admin.credential.cert(serviceAccount as ServiceAccount),
        };
    this.app = admin.initializeApp(options);
  }

  public async validateToken(token: string) {
    try {
      const decodedIdToken = await this.app.auth().verifyIdToken(token);
      return decodedIdToken;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
