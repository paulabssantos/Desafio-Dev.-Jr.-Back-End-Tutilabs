import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthenticationService } from 'src/modules/authentication/services/authentication.service';
import { User } from 'src/modules/users/entities/user.entity';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthenticationService) {
        super({
            usernameField: 'email', passwordField: 'password',
        });
    }

    async validate(email: string, password: string): Promise<Omit<User, "password">> {
        const user = await this.authService.validateUser(email, password);
        return user;
    }
}