import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { UserService } from 'src/services';
import { Public } from '../decorators/public.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Get()
  getStructures() {
    return this.userService.getUsers();
  }

  @Public()
  @Post()
  async postLogin(@Body() userDto: UserDto) {
    return await this.userService.createUser(userDto);
  }
}
