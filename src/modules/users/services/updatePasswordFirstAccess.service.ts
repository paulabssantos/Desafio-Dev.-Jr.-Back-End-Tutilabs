import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AuthenticationService } from 'src/modules/authentication/services/authentication.service';
import { UpdatePasswordDTO } from "../dto/update-password.dto";
import { UserRepository } from "src/app/config/database/repositories/users/UserRepository";
import { UserPayload } from "src/modules/authentication/dto/user-payload.dto";

@Injectable()
export class UpdatePasswordFirstAccessService {
    constructor(private authService: AuthenticationService, private userRepository: UserRepository) { }

    async execute({ actual_password, email, new_password }: UpdatePasswordDTO) {
        const validateUser = await this.authService.validateUser(email, actual_password)
        if (validateUser.last_access != null) {
            throw new HttpException('Você só pode alterar a senha no seu primeiro acesso', HttpStatus.BAD_REQUEST)
        }
        await this.userRepository.update(validateUser.id, { password: new_password })
    }
}