import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/modules/authentication/guards/local-auth.guard';
import { AuthenticationService } from './services/authentication.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('authentication')
@Controller('login')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) { }

  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: "Login", description: "Loga usuário e retorna token de autenticação" })
  @ApiBody({ schema: { properties: { email: { type: 'string', description: "Email do usuario" }, password: { type: 'string', description: "Senha do usuario" } } } })
  @Post()
  create(@Request() req) {
    return this.authenticationService.login(req.user)
  }
}
