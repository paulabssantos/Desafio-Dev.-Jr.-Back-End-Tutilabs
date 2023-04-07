import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/app/config/database/repositories/users/UserRepository';
import { JwtService } from '@nestjs/jwt';
import { Hash } from 'src/utils/hash/hash';
import { User } from '../../users/entities/user.entity';
import { UserPayload } from '../dto/user-payload.dto';


@Injectable()
export class AuthenticationService {
  constructor(private userRepository: UserRepository, private jwtService: JwtService, private hash: Hash) { }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findByEmail(email);
    if (user) {
      const isValid = await this.hash.compare(password, user.password)
      if (isValid) {
        const { password, ...result } = user;
        return result
      }
    }
    throw new HttpException('Email ou senha inválidos', HttpStatus.UNAUTHORIZED)
  }

  async login(user: User) {
    const payload: UserPayload = { id: user.id, fk_roles: user.fk_roles };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}