import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserRepository } from 'src/app/config/database/repositories/users/UserRepository';
import { Hash } from 'src/utils/hash/hash';
import { roles } from 'src/modules/authentication/enum/roles.enum';

@Injectable()
export class CreateUserService {
  constructor(private readonly userRepository: UserRepository, private readonly hashService: Hash) { }
  async execute({ email, fk_roles, name }: CreateUserDto) {
    if (email) {
      const email_exists = await this.userRepository.findByEmail(email);
      if (email_exists) {
        throw new HttpException(
          'Email já vinculado a um usuário',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    if (fk_roles != roles.Admin && fk_roles != roles.Producer && fk_roles != roles.Screenwriter) {
      throw new HttpException('O nível de acesso informado é inválido. Os níveis são admin, produtora e roteirista', HttpStatus.BAD_REQUEST)
    }

    const hash_password = await this.hashService.hash(email.split("@")[0] + '12345')

    return await this.userRepository.create({
      email,
      fk_roles,
      name,
      password: hash_password,
    });
  }
}
