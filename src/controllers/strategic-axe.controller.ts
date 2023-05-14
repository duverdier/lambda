import { Body, Controller, Post, Get, Param, ParseIntPipe, Put } from '@nestjs/common';
import { StrategicAxeService } from '../services';
import { ApiTags } from '@nestjs/swagger';
import { StrategicAxeDto, UpdateStrategicAxeDto } from '../dto/strategic-axe.dto';

@ApiTags('Strategic Axe')
@Controller('strategic-axes')
export class StrategicAxeController {
  constructor(private readonly strategicAxeService: StrategicAxeService) {}

  @Post()
  async createStrategicAxe(@Body() strategicAxeDto: StrategicAxeDto) {
    return await this.strategicAxeService.createStrategicAxe(strategicAxeDto);
  }

  @Get()
  async getStrategicAxe() {
    return await this.strategicAxeService.getStrategicAxes();
  }

  @Get(':id')
  async getStrategicObjectiveById(@Param('id', ParseIntPipe) id: number) {
    return await this.strategicAxeService.getStrategicAxeById(+id);
  }

  @Put(':id')
  async updateStrategicAxe(
    @Body() updateStrategicAxeDto: UpdateStrategicAxeDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const response = await this.strategicAxeService.updateStrategicAxe(+id, updateStrategicAxeDto);
    return response;
  }
}
