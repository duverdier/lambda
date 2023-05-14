import { Body, Controller, Post, Param, Get, ParseIntPipe, Put } from '@nestjs/common';
import { PlanActionDto } from '../dto/plan-action.dto';
import { PlanActionService } from '../services';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Plan actions')
@Controller('plan-actions')
export class PlanActionController {
  constructor(private readonly planActionService: PlanActionService) {}

  @Post()
  async postRole(@Body() planActionDto: PlanActionDto) {
    return await this.planActionService.createPlanAction(planActionDto);
  }

  @Get()
  async getPerformanceIndicators() {
    const response = await this.planActionService.getPlanAction();
    return response;
  }

  @Get(':id/performance-indicators/:indicateursDePerformanceId')
  async getPlanActionByIdAndIndicateursDePerformanceId(
    @Param('id', ParseIntPipe) id: number,
    @Param('indicateursDePerformanceId', ParseIntPipe) indicateursDePerformanceId: number,
  ) {
    const response = await this.planActionService.getPlanActionByIdAndIndicateursDePerformanceId(
      +id,
      indicateursDePerformanceId,
    );
    return response;
  }

  @Get(':id')
  async getPerformanceIndicatorById(@Param('id', ParseIntPipe) id: number) {
    const response = await this.planActionService.getPlanActionById(+id);
    return response;
  }

  @Put(':id')
  async updatePlanAction(@Body() planActionDto: PlanActionDto, @Param('id', ParseIntPipe) id: number) {
    const response = await this.planActionService.updatePlanAction(+id, planActionDto);
    return response;
  }
}
