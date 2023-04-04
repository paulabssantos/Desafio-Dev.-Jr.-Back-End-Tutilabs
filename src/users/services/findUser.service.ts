import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/config/database/repositories/users/UserRepository';
import { ListUserDto } from '../dto/list-user.dto';


@Injectable()
export class FindUserService {
    constructor(private readonly userRepository: UserRepository) { }

    async execute({ id }: ListUserDto) {
        return await this.userRepository.find({ id })
    }
}
