import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TaskPolicyGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  public async canActivate(context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const req: Request = ctx.getRequest();
    const taskId = req.params.id;
    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
    });
    return task?.uid === req.user?.uid;
  }
}
