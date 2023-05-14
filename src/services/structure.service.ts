import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Structure, Role } from '../entity';
import { StructureDto } from '../dto/Structure.dto';
import { RoleService } from './role.service';

@Injectable()
export class StructureService {
  constructor(
    @Inject('STRUCTURE_REPOSITORY')
    private readonly structureRepository: typeof Structure,
    private readonly roleService: RoleService,
  ) {}
  async createStructure(structure: StructureDto) {
    const role = await this.roleService.getRoleById(structure.roleId);
    if (!role) {
      throw new HttpException('ROLE_NOT_FOUND', HttpStatus.NOT_FOUND);
    }
    return this.structureRepository.create<Structure>(structure);
  }

  getStructures() {
    return this.structureRepository.findAll<Structure>({
      include: [{ model: Role, required: false }],
      raw: true,
      nest: true,
    });
  }

  async getStructureById(id: number) {
    return await this.structureRepository.findOne<Structure>({
      where: { id },
      raw: true,
      nest: true,
    });
  }

  async createStructureFile(structure: { structureName: string; typeStructure: string }) {
    try {
      const { structureName, typeStructure } = structure;
      return await this.structureRepository.create<Structure>({
        typeStructure,
        structureName,
      });
    } catch (error) {
      console.log('error: ', error);
    }
  }

  async updateStructure(id: number, data: any) {
    return await this.structureRepository.update(data, { where: { id } });
  }
}
