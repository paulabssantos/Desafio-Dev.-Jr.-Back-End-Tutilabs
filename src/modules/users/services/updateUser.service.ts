import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserRepository } from 'src/app/config/database/repositories/users/UserRepository';

@Injectable()
export class UpdateUserService {
  constructor(private readonly userRepository: UserRepository) { }
  async execute(
    id: string,
    { email, fk_roles, name, password }: UpdateUserDto,
  ) {
    if (email) {
      const email_exists = await this.userRepository.findByEmail(email);
      if (email_exists) {
        throw new HttpException(
          'Email já vinculado a um usuário',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    return await this.userRepository.update(id, {
      email,
      fk_roles,
      name,
      password,
    });
  }
}
