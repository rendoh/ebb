import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import request from 'supertest';
import { Prisma, PrismaClient, Task } from '@prisma/client';
import axios from 'axios';
import faker from '@faker-js/faker/locale/ja';
import { AppModule } from '../src/app.module';
import { CreateTaskDto } from '../src/tasks/dto/create-task.dto';
import { TaskDto } from '../lib';

type User = {
  kind: string;
  localId: string;
  email: string;
  idToken: string;
  refreshToken: string;
  expiresIn: string;
};

describe('TaskController (e2e)', () => {
  let app: INestApplication;
  let user: User;
  let prisma: PrismaClient;

  beforeAll(async () => {
    const { data } = await axios.post<User>(
      `http://${process.env.FIREBASE_AUTH_EMULATOR_HOST}/identitytoolkit.googleapis.com/v1/accounts:signUp?key=local`,
      {
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
    );
    user = data;

    prisma = new PrismaClient();

    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('基本API', () => {
    beforeAll(async () => {
      await prisma.$transaction(
        [...Array(100)].map((_, i) =>
          prisma.task.create({
            data: {
              title: faker.lorem.word(),
              content: faker.lorem.sentence(),
              uid: i < 20 ? user.localId : faker.datatype.string(),
              createdAt: faker.datatype.datetime(),
            },
          }),
        ),
      );
    });
    afterAll(async () => {
      await prisma.task.deleteMany();
    });
    describe('GET: /tasks', () => {
      test('認証前のユーザはアクセスできない', () => {
        return request(app.getHttpServer())
          .get('/tasks')
          .expect(HttpStatus.UNAUTHORIZED);
      });

      test('自分のTask一覧を取得できる', async () => {
        const { body } = await request(app.getHttpServer())
          .get('/tasks')
          .auth(user.idToken, { type: 'bearer' })
          .expect(HttpStatus.OK);

        expect(typeof body.total).toBe('number');
        expect(body.data).toHaveLength(10);
        (body.data as Task[]).forEach((task) => {
          expect(task.uid).toBe(user.localId);
        });
      });
    });

    describe('POST: /tasks', () => {
      test('認証前のユーザはアクセスできない', () => {
        return request(app.getHttpServer())
          .post('/tasks')
          .send({
            title: 'title',
            content: 'content',
          })
          .expect(HttpStatus.UNAUTHORIZED);
      });

      test('Taskを作成できる', async () => {
        const createTaskDto: CreateTaskDto = {
          title: faker.lorem.word(),
          content: faker.lorem.sentence(),
        };
        const { body } = await request(app.getHttpServer())
          .post('/tasks')
          .auth(user.idToken, { type: 'bearer' })
          .send(createTaskDto)
          .expect(HttpStatus.CREATED);

        expect(body.title).toBe(createTaskDto.title);
        expect(body.content).toBe(createTaskDto.content);

        const task = await prisma.task.findUnique({
          where: {
            id: body.id,
          },
        });
        expect(task).not.toBeNull();
      });
    });

    xdescribe('GET: /tasks/:id', () => {
      /* TODO */
    });
    xdescribe('PATCH: /tasks/:id', () => {
      /* TODO */
    });
    xdescribe('DELETE: /tasks/:id', () => {
      /* TODO */
    });
  });

  describe('Tasks: 前回チェックから1, 3, 10, 30日経過したTaskを取得できる', () => {
    const titleToBeIncluded = 'should be included';
    const titleNotToBeIncluded = 'should not be included';
    let lengthOfTasksShouldBeIncluded: number;
    function getDateNDaysAgo(days: number) {
      const date = new Date();
      date.setDate(date.getDate() - days);
      return date;
    }

    beforeAll(async () => {
      const data: Prisma.TaskCreateArgs['data'][] = [
        {
          title: 'should not be included',
          content: titleNotToBeIncluded,
          uid: user.localId,
          createdAt: getDateNDaysAgo(0),
          lastCheckedAt: getDateNDaysAgo(0),
        },
        {
          title: titleToBeIncluded,
          content: titleToBeIncluded,
          uid: user.localId,
          createdAt: getDateNDaysAgo(1),
          lastCheckedAt: getDateNDaysAgo(1),
        },
        {
          title: titleNotToBeIncluded,
          content: titleNotToBeIncluded,
          uid: user.localId,
          createdAt: getDateNDaysAgo(1),
          lastCheckedAt: getDateNDaysAgo(1),
          step: 2,
        },
        {
          title: titleToBeIncluded,
          content: titleToBeIncluded,
          uid: user.localId,
          createdAt: getDateNDaysAgo(3),
          lastCheckedAt: getDateNDaysAgo(3),
          step: 2,
        },
        {
          title: titleNotToBeIncluded,
          content: titleNotToBeIncluded,
          uid: user.localId,
          createdAt: getDateNDaysAgo(3),
          lastCheckedAt: getDateNDaysAgo(3),
          step: 3,
        },
        {
          title: titleToBeIncluded,
          content: titleToBeIncluded,
          uid: user.localId,
          createdAt: getDateNDaysAgo(10),
          lastCheckedAt: getDateNDaysAgo(10),
          step: 3,
        },
        {
          title: titleNotToBeIncluded,
          content: titleNotToBeIncluded,
          uid: user.localId,
          createdAt: getDateNDaysAgo(10),
          lastCheckedAt: getDateNDaysAgo(10),
          step: 4,
        },
        {
          title: titleToBeIncluded,
          content: titleToBeIncluded,
          uid: user.localId,
          createdAt: getDateNDaysAgo(30),
          lastCheckedAt: getDateNDaysAgo(30),
          step: 4,
        },
      ];
      await prisma.$transaction(
        data.map((task) =>
          prisma.task.create({
            data: task,
          }),
        ),
      );

      lengthOfTasksShouldBeIncluded = data.filter(
        ({ title }) => title === titleToBeIncluded,
      ).length;
    });

    afterAll(async () => {
      await prisma.task.deleteMany();
    });

    test('認証前のユーザはアクセスできない', () => {
      return request(app.getHttpServer())
        .get('/tasks/todos')
        .expect(HttpStatus.UNAUTHORIZED);
    });

    test('自分のTodo一覧を取得できる', async () => {
      return request(app.getHttpServer())
        .get('/tasks/todos')
        .auth(user.idToken, { type: 'bearer' })
        .expect(HttpStatus.OK);
    });

    test('含まれるべきTaskを含む', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/tasks/todos')
        .auth(user.idToken, { type: 'bearer' });
      const result = body.data.every(
        ({ title }: TaskDto) => title === titleToBeIncluded,
      );
      expect(result).toBe(true);
      expect(body.total).toBe(lengthOfTasksShouldBeIncluded);
    });

    test('含まれるべきでないTaskを含まない', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/tasks/todos')
        .auth(user.idToken, { type: 'bearer' });
      const result = body.data.every(
        ({ title }: TaskDto) => title !== titleNotToBeIncluded,
      );
      expect(result).toBe(true);
    });
  });
});
