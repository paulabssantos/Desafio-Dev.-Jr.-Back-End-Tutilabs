import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserService } from './services/createUser.service';
import { FindUserService } from './services/findUser.service';
import { ListUsersService } from './services/listUser.service';
import { UpdateUserService } from './services/updateUser.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly listUsersService: ListUsersService,
    private readonly updateUserService: UpdateUserService,
    private readonly findUserProducerService: FindUserService,
  ) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.createUserService.execute(createUserDto);
  }

  @Get()
  list() {
    return this.listUsersService.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findUserProducerService.execute({ id });
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.updateUserService.execute(id, updateUserDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
