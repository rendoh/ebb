import { Injectable, NotFoundException } from '@nestjs/common';
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
    });
  }

  public async findAll(
    uid: string,
    { page, limit }: { page: number; limit: number },
  ) {
    const [count, tasks] = await this.prisma.$transaction([
      this.prisma.task.count({
        where: {
          uid,
        },
      }),
      this.prisma.task.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: {
          uid,
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
    ]);
    return {
      data: tasks,
      total: count,
    };
  }

  public async findOne(id: string) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });
    if (!task) {
      throw new NotFoundException();
    }
    return task;
  }

  public async update(id: string, updateTaskDto: UpdateTaskDto) {
    return this.prisma.task.update({
      where: {
        id,
      },
      data: updateTaskDto,
    });
  }

  public remove(id: string) {
    return this.prisma.task.delete({
      where: {
        id,
      },
    });
  }
}
