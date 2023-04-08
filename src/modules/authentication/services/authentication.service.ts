import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/app/config/database/repositories/users/UserRepository';
import { JwtService } from '@nestjs/jwt';
import { Hash } from 'src/utils/hash/hash';
import { User } from '../../users/entities/user.entity';
import { UserPayload } from '../dto/user-payload.dto';
import * as dayjs from 'dayjs';

@Injectable()
export class AuthenticationService {
  constructor(private userRepository: UserRepository, private jwtService: JwtService, private hash: Hash) { }

  async validateUser(email: string, pass: string): Promise<Omit<User, "password">> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new HttpException('Email inválido', HttpStatus.UNAUTHORIZED)
    }
    const isValid = await this.hash.compare(pass, user.password)
    if (!isValid) {
      throw new HttpException('Senha inválida', HttpStatus.UNAUTHORIZED)
    }

    const { password, ...result } = user;
    return result

  }

  async login(user: User) {
    const payload: UserPayload = { id: user.id, fk_roles: user.fk_roles };
    await this.userRepository.update(user.id, { last_access: new Date(dayjs().format('YYYY-MM-DDTHH:mm:ss-00:00')) })
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}