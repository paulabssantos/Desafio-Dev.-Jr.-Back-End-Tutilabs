import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserRepository } from '../../main/config/db/repositories/users/UserRepository';

@Injectable()
export class CreateUserService {
  constructor(private readonly userRepository: UserRepository) {}
  async execute({ email, fk_roles, name, password }: CreateUserDto) {
    return await this.userRepository.create({
      email,
      fk_roles,
      name,
      password,
    });
  }
}
