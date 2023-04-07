import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/modules/authentication/guards/local-auth.guard';
import { AuthenticationService } from './services/authentication.service';


@Controller('login')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) { }

  @UseGuards(LocalAuthGuard)
  @Post()
  create(@Request() req) {
    return this.authenticationService.login(req.user)
  }
}
