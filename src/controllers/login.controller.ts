import { Body, Controller, Post, Put, Get } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { AuthService, StrategicAxeService } from 'src/services';
import { Public } from '../decorators/public.decorator';
import { ForgetPasswordDto } from 'src/dto/forget-password.dto';

@Controller()
export class LoginController {
  constructor(private readonly authService: AuthService, private readonly strategicAxeService: StrategicAxeService) {}

  @Public()
  @Post('/login')
  async postLogin(@Body() loginDto: LoginDto) {
    return await this.authService.getAccessToken(loginDto);
  }

  @Put('/reset-password')
  @Public()
  async resetPassword(@Body() passwordToReset: ForgetPasswordDto) {
    const response = await this.authService.resetPassword(passwordToReset);
    return response;
  }

  @Get('/get-view-axe')
  @Public()
  async getViewAxe() {
    const response = await this.strategicAxeService.getViewAxe();
    return response;
  }
}
