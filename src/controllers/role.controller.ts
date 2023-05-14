import { Body, Controller, Post, Get, Param, ParseIntPipe, Put } from '@nestjs/common';
import { RoleDto } from '../dto/role.dto';
import { RoleService } from '../services';
import { ApiTags } from '@nestjs/swagger';
import { Role } from '../entity/role.entity';

@ApiTags('Roles')
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async postRole(@Body() roleDto: RoleDto) {
    return await this.roleService.createRole(roleDto);
  }

  @Get()
  async getRoles() {
    return await this.roleService.getRoles();
  }

  @Get(':id')
  async getRoleById(@Param('id', ParseIntPipe) id: number) {
    return await this.roleService.getRoleById(+id);
  }

  @Put(':id')
  async updateContrat(@Body() roleDto: RoleDto, @Param('id', ParseIntPipe) id: number) {
    const response = await this.roleService.updateRole(+id, roleDto as Role);
    return response;
  }
}
