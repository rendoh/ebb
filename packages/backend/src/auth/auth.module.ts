import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { FirebaseStrategy } from './strategies/firebase-strategy';
import admin, { ServiceAccount } from 'firebase-admin';
import serviceAccount from './firebase-adminsdk-service-account-file.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
});

@Module({
  imports: [PassportModule],
  providers: [FirebaseStrategy],
})
export class AuthModule {}
