import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import admin, { AppOptions } from 'firebase-admin';
import { applicationDefault } from 'firebase-admin/app';

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
          credential: applicationDefault(),
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
