import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PaginatedDto } from '../pagination/dto/paginated.dto';
import { TaskDto } from './dto/task.dto';

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

  public async findTodos(
    uid: string,
    { cursor, limit }: { cursor?: string; limit: number },
  ): Promise<PaginatedDto<TaskDto>> {
    const where: Prisma.TaskWhereInput = {
      uid,
      OR: [
        {
          step: 1,
          lastCheckedAt: {
            lte: this.getDateNDaysAgo(1),
          },
        },
        {
          step: 2,
          lastCheckedAt: {
            lte: this.getDateNDaysAgo(3),
          },
        },
        {
          step: 3,
          lastCheckedAt: {
            lte: this.getDateNDaysAgo(10),
          },
        },
        {
          step: 4,
          lastCheckedAt: {
            lte: this.getDateNDaysAgo(30),
          },
        },
      ],
    };
    const [count, tasks] = await this.prisma.$transaction([
      this.prisma.task.count({
        where,
      }),
      this.prisma.task.findMany({
        skip: cursor ? 1 : 0,
        take: limit,
        cursor: cursor
          ? {
              id: cursor,
            }
          : undefined,
        where,
        orderBy: {
          createdAt: 'asc',
        },
      }),
    ]);
    return {
      data: tasks,
      total: count,
    };
  }

  public async findAll(
    uid: string,
    { page, limit }: { page: number; limit: number },
  ): Promise<PaginatedDto<TaskDto>> {
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

  private getDateNDaysAgo(days: number) {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date;
  }
}
