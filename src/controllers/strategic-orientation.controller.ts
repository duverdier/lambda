import { Body, Controller, Post, Get, Param, ParseIntPipe, Put } from '@nestjs/common';
import { StrategicOrientationService } from '../services';
import { ApiTags } from '@nestjs/swagger';
import { StrategicOrientationDto, UpdateStrategicOrientationDto } from 'src/dto/strategic-orientation.dto';
import { Public } from '../decorators/public.decorator';

@ApiTags('Strategic Orientation')
@Controller('strategic-orientations')
export class StrategicOrientationController {
  constructor(private readonly strategicOrientationService: StrategicOrientationService) {}

  @Post()
  @Public()
  async createStrategicOrientation(@Body() strategicOrientationDto: StrategicOrientationDto) {
    return await this.strategicOrientationService.createStrategicOrientation(strategicOrientationDto);
  }

  @Get()
  @Public()
  async getStrategicOrientations() {
    return await this.strategicOrientationService.getStrategicOrientations();
  }

  @Get(':id')
  @Public()
  async getStrategicOrientationById(@Param('id', ParseIntPipe) id: number) {
    return await this.strategicOrientationService.getStrategicOrientationById(+id);
  }

  @Get('objectif-strategique/:id')
  @Public()
  async getStrategicOrientationByObjectifStrategiqueId(@Param('id', ParseIntPipe) objectifStrategiqueId: number) {
    return await this.strategicOrientationService.getStrategicOrientationByObjectifStrategiqueId(
      +objectifStrategiqueId,
    );
  }

  @Put(':id')
  @Public()
  async updateStrategicOrientation(
    @Body() updateStrategicOrientationDto: UpdateStrategicOrientationDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const response = await this.strategicOrientationService.updateStrategicOrientation(
      +id,
      updateStrategicOrientationDto,
    );
    return response;
  }
}
