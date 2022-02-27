import { Module, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { TasksModule } from './tasks/tasks.module';
import { PrismaClientExceptionFilter } from './prisma/prisma-client-exception.filter';

@Module({
  imports: [AuthModule, TasksModule],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard('bearer'),
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ whitelist: true }),
    },
    {
      provide: APP_FILTER,
      useClass: PrismaClientExceptionFilter,
    },
  ],
})
export class AppModule {}
