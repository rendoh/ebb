import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

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

  public findAll(uid: string) {
    return this.prisma.task.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        archived: true,
      },
      where: {
        uid,
      },
    });
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    return this.prisma.task.update({
      where: {
        id,
      },
      data: updateTaskDto,
    });
  }
}
