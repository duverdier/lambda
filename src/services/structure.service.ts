import { Inject, Injectable } from '@nestjs/common';
import { Structure } from '../entity/structure.entity';
import { StructureDto } from '../dto/Structure.dto';
@Injectable()
export class StructureService {
  constructor(
    @Inject('STRUCTURE_REPOSITORY')
    private readonly structureRepository: typeof Structure,
  ) {}
  createStructure(structure: StructureDto) {
    this.structureRepository.create<Structure>(structure);
  }

  getStructures() {
    return this.structureRepository.findAll<Structure>();
  }
}
