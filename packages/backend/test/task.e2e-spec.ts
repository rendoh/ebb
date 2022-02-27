import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import axios from 'axios';

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

  beforeAll(async () => {
    /**
     * TODO:
     * @faker-js/faker などに変更
     * 実装方法をリファクタリング
     */
    const { data } = await axios.post<User>(
      'http://localhost:9099/identitytoolkit.googleapis.com/v1/accounts:signUp?key=local',
      {
        email: `user_${Math.random()}@example.com`,
        password: 'P@ssw0rd',
      },
    );
    user = data;

    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('GET: /tasks', () => {
    test('認証前のユーザはアクセスできない', () => {
      return request(app.getHttpServer()).get('/tasks').expect(401);
    });
    test('認証済のユーザは自分のTask一覧を取得できる', () => {
      return request(app.getHttpServer())
        .get('/tasks')
        .auth(user.idToken, { type: 'bearer' })
        .expect(200);
    });
  });
});
