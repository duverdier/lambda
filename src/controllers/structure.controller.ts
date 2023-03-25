import { Body, Controller, Get, Post } from '@nestjs/common';
import { StructureService } from '../services/structure.service';
import { StructureDto } from '../dto/Structure.dto';

@Controller()
export class StructureController {
  constructor(private readonly structureService: StructureService) {}

  @Post('/structures')
  postStructure(@Body() structure: StructureDto) {
    return this.structureService.createStructure(structure);
  }

  @Get('/structures')
  getStructures() {
    return this.structureService.getStructures();
  }
}
