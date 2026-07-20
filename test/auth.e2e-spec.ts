import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('Authentication System (e2e)', () => {
    let app: INestApplication<App>;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('signup request handling', () => {
        const email = 'some@testrandom.com';
        const name = 'Some Test User';

        return request(app.getHttpServer())
            .post('/auth/signup')
            .send({
                email: email,
                password: 'password',
                name: name
            })
            .expect(201)
            .then((res) => {
                const { id, email, name } = res.body;
                expect(id).toBeDefined();
                expect(email).toEqual(email);
                expect(name).toEqual(name);
            })
    });

    afterEach(async () => {
        await app.close();
    });

    it('signin as a new user then get the current user', async () => {
        const email = 'some@test.com';

        const response = await request(app.getHttpServer())
            .post('/auth/signup')
            .send({
                email: email,
                password: 'password',
                name: 'Some Test User'
            })
            .expect(201);

        const cookie = response.get('Set-Cookie') as string[];

        const { body } = await request(app.getHttpServer())
            .get('/auth/whoami')
            .set('Cookie', cookie)
            .expect(200);

        expect(body.email).toEqual(email);
    });
});
