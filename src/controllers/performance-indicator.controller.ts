import { Body, Controller, Post, Get, ParseIntPipe, Param, Put } from '@nestjs/common';
import { PerformanceIndicatorService } from '../services';
import { PerformanceIndicatorDto } from '../dto/performance-indicator.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../decorators/public.decorator';

@ApiTags('Performance indicators')
@Controller('performance-indicators')
export class PerformanceIndicatorController {
  constructor(private readonly performanceIndicatorService: PerformanceIndicatorService) {}

  @Post()
  @Public()
  async createPerformanceIndicator(@Body() performanceIndicatorDto: PerformanceIndicatorDto) {
    return await this.performanceIndicatorService.createPerformanceIndicator(performanceIndicatorDto);
  }

  @Get()
  @Public()
  async getPerformanceIndicators() {
    const response = await this.performanceIndicatorService.getPerformanceIndicators();
    return response;
  }

  @Get(':id')
  @Public()
  async getPerformanceIndicatorById(@Param('id', ParseIntPipe) id: number) {
    const response = await this.performanceIndicatorService.getPerformanceIndicatorById(+id);
    return response;
  }

  @Get('objectif-operationnel/:id')
  @Public()
  async getPerformanceIndicatorsByObjectifOperationnelId(@Param('id', ParseIntPipe) objectifOperationnelId: number) {
    const response = await this.performanceIndicatorService.getPerformanceIndicatorsByObjectifOperationnelId(
      +objectifOperationnelId,
    );
    return response;
  }

  @Put(':id')
  @Public()
  async updatePerformanceIndicator(
    @Body() performanceIndicatorDto: PerformanceIndicatorDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const response = await this.performanceIndicatorService.updatePerformanceIndicator(+id, performanceIndicatorDto);
    return response;
  }

  @Put(':id/structure/:structureId/assign')
  @Public()
  async assignPerformanceIndicatorStructure(
    @Param('id', ParseIntPipe) id: number,
    @Param('structureId', ParseIntPipe) structureId: number,
  ) {
    const response = await this.performanceIndicatorService.assignPerformanceIndicatorStructure(+id, +structureId);
    return response;
  }
}
