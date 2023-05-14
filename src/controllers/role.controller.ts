import { Body, Controller, Post } from '@nestjs/common';
import { RoleDto } from '../dto/role.dto';
import { RoleService } from '../services';
import { Public } from '../decorators/public.decorator';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Public()
  @Post()
  async postRole(@Body() roleDto: RoleDto) {
    return await this.roleService.createRole(roleDto);
  }
}
