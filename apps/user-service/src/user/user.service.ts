import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from '@app/user/user.entity';
import { EntityRepository } from '@mikro-orm/postgresql';
import { UserDto } from '@app/user/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  async isEmailTaken(email: string): Promise<boolean> {
    return !!(await this.userRepository.findOne({ email }));
  }

  async getByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ email });
    if (user) return user;
    throw new NotFoundException(`User with email ${email} not found`);
  }

  async getById(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (user) return user;
    throw new NotFoundException(`User with id ${id} not found`);
  }

  async create(userData: UserDto): Promise<User> {
    const user: User = this.userRepository.create(userData);
    await this.userRepository.persistAndFlush(user);
    return user;
  }
}
