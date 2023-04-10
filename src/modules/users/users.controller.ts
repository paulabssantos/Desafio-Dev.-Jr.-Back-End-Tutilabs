import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '../authentication/decorators/roles.decorator';
import { roles } from '../authentication/enum/roles.enum';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';
import { RolesGuard } from '../authentication/guards/roles.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { ListUserDto } from './dto/list-user.dto';
import { UpdatePasswordDTO } from './dto/update-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserService } from './services/createUser.service';
import { DeleteUserService } from './services/deleteUser.service';
import { FindUserService } from './services/findUser.service';
import { ListUsersService } from './services/listUser.service';
import { UpdatePasswordFirstAccessService } from './services/updatePasswordFirstAccess.service';
import { UpdateUserService } from './services/updateUser.service';
import { LocalAuthGuard } from '../authentication/guards/local-auth.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly listUsersService: ListUsersService,
    private readonly updateUserService: UpdateUserService,
    private readonly findUserService: FindUserService,
    private readonly deleteUserService: DeleteUserService,
    private readonly updatePasswordFirstAccessService: UpdatePasswordFirstAccessService
  ) { }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Filtra usuários', description: "Filtra usuários por nome, email,id e nivel de acesso" })
  @Roles(roles.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/filter')
  findOne(@Body() { email, fk_roles, id, name }: ListUserDto) {
    return this.findUserService.execute({ id, email, fk_roles, name });
  }

  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Alterar senha' })
  @Put('/password')
  updatePassword(@Body() { email, password, new_password }: UpdatePasswordDTO) {
    return this.updatePasswordFirstAccessService.execute({ email, password, new_password })
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualiza um usuário' })
  @Roles(roles.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.updateUserService.execute(id, updateUserDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Deleta um usuário' })
  @Roles(roles.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteUserService.execute(id)
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Lista todos os usuários' })
  @Roles(roles.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  list() {
    return this.listUsersService.execute();
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cria um usuário' })
  @Roles(roles.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.createUserService.execute(createUserDto);
  }
}
