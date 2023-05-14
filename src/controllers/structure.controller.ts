import { Body, Controller, Get, Post, Param, ParseIntPipe, Put } from '@nestjs/common';
import { StructureService } from '../services/structure.service';
import { StructureDto } from '../dto/Structure.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Structures')
@Controller('structures')
export class StructureController {
  constructor(private readonly structureService: StructureService) {}

  @Post()
  postStructure(@Body() structure: StructureDto) {
    return this.structureService.createStructure(structure);
  }

  @Get()
  getStructures() {
    return this.structureService.getStructures();
  }

  @Get(':id')
  async getStructureById(@Param('id', ParseIntPipe) id: number) {
    return await this.structureService.getStructureById(+id);
  }

  @Put(':id')
  async updateStructure(@Body() structure: StructureDto, @Param('id', ParseIntPipe) id: number) {
    const response = await this.structureService.updateStructure(+id, structure);
    return response;
  }
}
