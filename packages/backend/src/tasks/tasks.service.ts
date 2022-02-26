import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  public async create(uid: string, { title, content }: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        title,
        content,
        uid,
      },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
      },
    });
  }
}
