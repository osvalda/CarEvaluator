import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './users.entity';

let service: AuthService;

describe('AuthService', () => {
    beforeEach(async () => {
        const fakeUserService: Partial<UsersService> = {
            find: () => Promise.resolve([]),
            create: (email: string, password: string, name: string) =>
                Promise.resolve({ id: 1, email, password, name } as User)
        }

        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: fakeUserService
                }]
        }).compile();

        service = module.get(AuthService);
    });

    it('create an instancec of service', async () => {
        expect(service).toBeDefined();
    });

});