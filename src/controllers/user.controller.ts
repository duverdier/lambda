import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { UserService } from 'src/services';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getStructures() {
    return this.userService.getUsers();
  }

  @Post()
  async postLogin(@Body() userDto: UserDto) {
    return await this.userService.createUser(userDto);
  }
}
