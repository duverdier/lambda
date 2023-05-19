import { Body, Controller, Post, Get, Param, ParseIntPipe, Put } from '@nestjs/common';
import { StrategicObjectiveService } from '../services';
import { ApiTags } from '@nestjs/swagger';
import { StrategicObjectiveDto, UpdateStrategicObjectiveDto } from 'src/dto/strategic-objective.dto';
import { Public } from '../decorators/public.decorator';

@ApiTags('StrategicObjective')
@Controller('strategic-objectives')
export class StrategicObjectiveController {
  constructor(private readonly strategicObjectiveService: StrategicObjectiveService) {}

  @Post()
  @Public()
  async createStrategicObjective(@Body() strategicObjectiveDto: StrategicObjectiveDto) {
    return await this.strategicObjectiveService.createStrategicObjectiveWithAxeStrategiqueId(strategicObjectiveDto);
  }

  @Get()
  @Public()
  async getRoles() {
    return await this.strategicObjectiveService.getStrategicObjectives();
  }

  @Get(':id')
  @Public()
  async getStrategicObjectiveById(@Param('id', ParseIntPipe) id: number) {
    return await this.strategicObjectiveService.getStrategicObjectiveById(+id);
  }

  @Get('axe-strategique/:id')
  @Public()
  async getStrategicObjectiveByAxeStrategiqueId(@Param('id', ParseIntPipe) axeStrategiqueId: number) {
    return await this.strategicObjectiveService.getStrategicObjectiveByAxeStrategiqueId(+axeStrategiqueId);
  }

  @Put(':id')
  @Public()
  async updateStrategicObjective(
    @Body() updateStrategicObjectiveDto: UpdateStrategicObjectiveDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const response = await this.strategicObjectiveService.updateStrategicObjective(+id, updateStrategicObjectiveDto);
    return response;
  }
}
