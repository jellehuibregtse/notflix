import {
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserRequest } from './dtos/create-user.request';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { User } from './entites/user.entity';
import { ACCOUNT_SERVICE } from './constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: EntityRepository<User>,
    private readonly em: EntityManager,
    @Inject(ACCOUNT_SERVICE) private readonly accountClient: ClientProxy,
  ) {}

  async isEmailTaken(email: string): Promise<boolean> {
    return !!(await this.usersRepository.findOne({ email }));
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ email });
    if (user) return user;
    throw new NotFoundException(`User with email ${email} not .`);
  }

  async findById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    if (user) return user;
    throw new NotFoundException(`User with id ${id} not found.`);
  }

  async create(request: CreateUserRequest): Promise<User> {
    // Start a transaction.
    await this.em.begin();

    try {
      await this.validateCreateUserRequest(request);
      const user = this.usersRepository.create({
        ...request,
        password: await bcrypt.hash(request.password, 10),
      });
      this.em.persist(user);
      await lastValueFrom(this.accountClient.emit('user_created', request));
      await this.em.commit();
      return user;
    } catch (error) {
      // If an error occurred, rollback the transaction.
      await this.em.rollback();
      throw error;
    }
  }

  private async validateCreateUserRequest(request: CreateUserRequest) {
    if (await this.isEmailTaken(request.email)) {
      throw new UnprocessableEntityException(
        'This email has already been taken.',
      );
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.findByEmail(email);
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw new UnauthorizedException('Invalid credentials.');
    }
    return user;
  }

  async getUser(getUserArgs: Partial<User>) {
    return this.usersRepository.findOne(getUserArgs);
  }
}
