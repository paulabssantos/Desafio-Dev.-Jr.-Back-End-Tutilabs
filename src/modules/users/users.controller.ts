import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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


@UseGuards(JwtAuthGuard, RolesGuard)

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly listUsersService: ListUsersService,
    private readonly updateUserService: UpdateUserService,
    private readonly findUserProducerService: FindUserService,
    private readonly deleteUserService: DeleteUserService
  ) { }

  @Roles(roles.Admin)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.createUserService.execute(createUserDto);
  }

  @Roles(roles.Admin)
  @Get()
  list() {
    return this.listUsersService.execute();
  }

  @Roles(roles.Admin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findUserProducerService.execute({ id });
  }

  @Roles(roles.Admin)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.updateUserService.execute(id, updateUserDto);
  }

  @Roles(roles.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteUserService.execute(id)
  }
}
