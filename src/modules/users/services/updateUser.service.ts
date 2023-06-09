import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserRepository } from 'src/app/config/database/repositories/users/UserRepository';
import { roles } from 'src/modules/authentication/enum/roles.enum';
import { Hash } from 'src/utils/hash/hash';

@Injectable()
export class UpdateUserService {
  constructor(private readonly userRepository: UserRepository, private hashService: Hash) { }
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

    if (fk_roles != roles.Admin && fk_roles != roles.Producer && fk_roles != roles.Screenwriter) {
      throw new HttpException('O nível de acesso informado é inválido. Os níveis são admin, produtora e roteirista', HttpStatus.BAD_REQUEST)
    }

    let hash_password = undefined
    if (password) {
      hash_password = await this.hashService.hash(password)
    }

    return await this.userRepository.update(id, {
      email,
      fk_roles,
      name,
      password: hash_password,
    });
  }
}
