import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Controller()
export class LoginController {
  constructor(private readonly jwtService: JwtService) {}
  @Post('/login')
  postLogin(@Body() loginDto: LoginDto): { accessToken: string } {
    // Todo verify login
    return { accessToken: this.jwtService.sign(loginDto) };
  }
}
