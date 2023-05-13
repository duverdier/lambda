import { Inject, Injectable } from '@nestjs/common';
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
}
