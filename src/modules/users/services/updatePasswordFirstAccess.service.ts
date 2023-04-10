import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AuthenticationService } from 'src/modules/authentication/services/authentication.service';
import { UpdatePasswordDTO } from "../dto/update-password.dto";
import { UserRepository } from "src/app/config/database/repositories/users/UserRepository";
import { Hash } from "src/utils/hash/hash";
import { UserPayload } from "src/modules/authentication/dto/user-payload.dto";

@Injectable()
export class UpdatePasswordFirstAccessService {
    constructor(private hashService: Hash, private authService: AuthenticationService, private userRepository: UserRepository) { }

    async execute({ email, password, new_password }: UpdatePasswordDTO) {
        const user = await this.userRepository.findByEmail(email)
        if (!user) {
            throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND)
        }
        if (user.last_access != null) {
            throw new HttpException('Você só pode alterar a senha no seu primeiro acesso', HttpStatus.BAD_REQUEST)
        }
        await this.userRepository.update(user.id, { password: await this.hashService.hash(new_password) })
        return await this.authService.login(user)
    }
}