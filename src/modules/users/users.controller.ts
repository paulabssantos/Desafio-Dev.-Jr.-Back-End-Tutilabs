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
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserService } from './services/createUser.service';
import { FindUserService } from './services/findUser.service';
import { ListUsersService } from './services/listUser.service';
import { UpdateUserService } from './services/updateUser.service';
import { RolesGuard } from '../authentication/guards/roles.guard';
import { Roles } from '../authentication/decorators/roles.decorator';
import { roles } from '../authentication/enum/roles.enum';
import { DeleteUserService } from './services/deleteUser.service';
import { UpdatePasswordDTO } from './dto/update-password.dto';
import { UpdatePasswordFirstAccessService } from './services/updatePasswordFirstAccess.service';
import { UserPayload } from '../authentication/dto/user-payload.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly listUsersService: ListUsersService,
    private readonly updateUserService: UpdateUserService,
    private readonly findUserProducerService: FindUserService,
    private readonly deleteUserService: DeleteUserService,
    private readonly updatePasswordFirstAccessService: UpdatePasswordFirstAccessService
  ) { }

  @Roles(roles.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findUserProducerService.execute({ id });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('/password')
  updatePassword(@Request() req, @Body() { actual_password, new_password }: UpdatePasswordDTO) {
    const user: UserPayload = req.user
    return this.updatePasswordFirstAccessService.execute(user, { actual_password, new_password })
  }

  @Roles(roles.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.updateUserService.execute(id, updateUserDto);
  }

  @Roles(roles.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteUserService.execute(id)
  }
  @Roles(roles.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  list() {
    return this.listUsersService.execute();
  }

  @Roles(roles.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.createUserService.execute(createUserDto);
  }
}
