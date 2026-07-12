import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';


describe('AuthService', () => {
    let service: AuthService;
    let fakeUsersService: Partial<UsersService>;

    beforeEach(async () => {
        const users: User[] = [];
        fakeUsersService = {
            find: (email: string) => {
                const filteredUsers = users.filter(user => user.email === email);
                return Promise.resolve(filteredUsers);
            },
            create: (email: string, password: string, name: string) => {
                const user = { id: Math.floor(Math.random() * 99999), email, password, name } as User;
                users.push(user);
                return Promise.resolve(user);
            }

        }

        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: fakeUsersService
                }]
        }).compile();

        service = module.get(AuthService);
    });

    it('create an instancec of service', async () => {
        expect(service).toBeDefined();
    });

    it('creates a new user with salted and hashed password', async () => {
        const password = "secret123";
        const user = await service.signup("email@valid.com", password, "John Doe");

        expect(user.password).not.toEqual(password);
        const [salt, hash] = user.password.split('.');
        expect(salt).toBeDefined();
        expect(hash).toBeDefined();
    });

    it('throws an error if user signs up with email that is in use', async () => {
        await service.signup('asdf@asdf.com', 'asdf');
        await expect(service.signup('asdf@asdf.com', 'asdf')).rejects.toThrow(
            BadRequestException,
        );
    });

    it('throws an error if user signs in with invalid credentials', async () => {
        await expect(service.signin("fine@email.com", "password")).rejects.toThrow(
            NotFoundException,
        );
    });

    it('throws if an invalid password is provided', async () => {
        await service.signup('laskdjf@alskdfj.com', 'origipsw');
        await expect(service.signin('laskdjf@alskdfj.com', 'fakepsw'),
        ).rejects.toThrow(BadRequestException);
    });

    it('returns a user if correct password is provided', async () => {
        await service.signup('asdf@asdf.com', 'laskdjf', 'John Doe');
        const user = await service.signin('asdf@asdf.com', 'laskdjf');
        expect(user).toBeDefined();
    });

});