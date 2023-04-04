import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserRepository } from 'src/config/database/repositories/users/UserRepository';
import { HashService } from 'src/utils/hash/hash.service';

@Injectable()
export class CreateUserService {
  constructor(private readonly userRepository: UserRepository, private readonly hashService: HashService) { }
  async execute({ email, fk_roles, name, password }: CreateUserDto) {
    const hash_password = await this.hashService.execute(password)

    return await this.userRepository.create({
      email,
      fk_roles,
      name,
      password: hash_password,
    });
  }
}
