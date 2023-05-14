import { Body, Controller, Post, Get, Param, ParseIntPipe, Put } from '@nestjs/common';
import { StrategicObjectiveService } from '../services';
import { ApiTags } from '@nestjs/swagger';
import { StrategicObjectiveDto, UpdateStrategicObjectiveDto } from 'src/dto/strategic-objective.dto';

@ApiTags('StrategicObjective')
@Controller('strategic-objectives')
export class StrategicObjectiveController {
  constructor(private readonly strategicObjectiveService: StrategicObjectiveService) {}

  @Post()
  async createStrategicObjective(@Body() strategicObjectiveDto: StrategicObjectiveDto) {
    return await this.strategicObjectiveService.createStrategicObjectiveWithAxeStrategiqueId(strategicObjectiveDto);
  }

  @Get()
  async getRoles() {
    return await this.strategicObjectiveService.getStrategicObjectives();
  }

  @Get(':id')
  async getStrategicObjectiveById(@Param('id', ParseIntPipe) id: number) {
    return await this.strategicObjectiveService.getStrategicObjectiveById(+id);
  }

  @Put(':id')
  async updateStrategicObjective(
    @Body() updateStrategicObjectiveDto: UpdateStrategicObjectiveDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const response = await this.strategicObjectiveService.updateStrategicObjective(+id, updateStrategicObjectiveDto);
    return response;
  }
}
