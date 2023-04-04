import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../main/config/db/repositories/users/UserRepository';

@Injectable()
export class ListUsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute() {
    return await this.userRepository.list();
  }
}