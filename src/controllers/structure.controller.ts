import { Body, Controller, Get, Post, Param, ParseIntPipe, Put } from '@nestjs/common';
import { StructureService } from '../services/structure.service';
import { StructureDto } from '../dto/Structure.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../decorators/public.decorator';

@ApiTags('Structures')
@Controller('structures')
export class StructureController {
  constructor(private readonly structureService: StructureService) {}

  @Post()
  @Public()
  postStructure(@Body() structure: StructureDto) {
    return this.structureService.createStructure(structure);
  }

  @Get()
  @Public()
  getStructures() {
    return this.structureService.getStructures();
  }

  @Get(':id')
  @Public()
  async getStructureById(@Param('id', ParseIntPipe) id: number) {
    return await this.structureService.getStructureById(+id);
  }

  @Put(':id')
  @Public()
  async updateStructure(@Body() structure: StructureDto, @Param('id', ParseIntPipe) id: number) {
    const response = await this.structureService.updateStructure(+id, structure);
    return response;
  }
}
