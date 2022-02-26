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
    });
  }

  public findAll(uid: string) {
    return this.prisma.task.findMany({
      where: {
        uid,
      },
    });
  }

  public async findOne(id: string) {
    return this.prisma.task.findUnique({
      where: { id },
    });
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
