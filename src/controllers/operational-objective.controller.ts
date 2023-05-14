import { Body, Controller, Post, Get, Param, ParseIntPipe, Put } from '@nestjs/common';
import { OperationalObjectiveService } from '../services';
import { ApiTags } from '@nestjs/swagger';
import { OperationalObjectiveDto, UpdateOperationalObjectiveDto } from 'src/dto/operational-objective.dto';
import { Public } from '../decorators/public.decorator';

@ApiTags('Operational Objective')
@Controller('operational-objectives')
export class OperationalObjectiveController {
  constructor(private readonly operationalObjectiveService: OperationalObjectiveService) {}

  @Post()
  @Public()
  async createOperationalObjective(@Body() operationalObjectiveDto: OperationalObjectiveDto) {
    return await this.operationalObjectiveService.createOperationalObjective(operationalObjectiveDto);
  }

  @Get()
  @Public()
  async getOperationalObjectives() {
    return await this.operationalObjectiveService.getOperationalObjectives();
  }

  @Get(':id')
  @Public()
  async getStrategicOrientationById(@Param('id', ParseIntPipe) id: number) {
    return await this.operationalObjectiveService.getOperationalObjectiveById(+id);
  }

  @Put(':id')
  @Public()
  async updateOperationalObjective(
    @Body() updateOperationalObjectiveDto: UpdateOperationalObjectiveDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const response = await this.operationalObjectiveService.updateOperationalObjective(
      +id,
      updateOperationalObjectiveDto,
    );
    return response;
  }
}
