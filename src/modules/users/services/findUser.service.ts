import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/app/config/database/repositories/users/UserRepository';
import { ListUserDto } from '../dto/list-user.dto';


@Injectable()
export class FindUserService {
    constructor(private readonly userRepository: UserRepository) { }

    async execute({ id, email, fk_roles, name }: ListUserDto) {
        return await this.userRepository.filter({ id, email, fk_roles, name })
    }
}
