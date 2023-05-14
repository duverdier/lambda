import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Role } from '../entity/role.entity';
import { RoleDto } from '../dto/role.dto';

@Injectable()
export class RoleService {
  constructor(
    @Inject('ROLE_REPOSITORY')
    private readonly roleRepository: typeof Role,
  ) {}
  createRole(role: RoleDto) {
    return this.roleRepository.create<Role>(role);
  }

  getRoles() {
    return this.roleRepository.findAll<Role>();
  }

  async getRoleById(id: number) {
    return await this.roleRepository.findOne<Role>({
      where: { id },
      raw: true,
      nest: true,
    });
  }

  async updateRole(id: number, data: Role) {
    const role = await this.getRoleById(id);
    if (!role) {
      throw new HttpException('ROLE_NOT_FOUND', HttpStatus.NOT_FOUND);
    }
    return await this.roleRepository.update(data, { where: { id } });
  }
}
