import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { BearerStrategy } from './strategies/bearer-strategy';
import { AuthService } from './auth.service';

@Module({
  imports: [PassportModule],
  providers: [BearerStrategy, AuthService],
})
export class AuthModule {}
