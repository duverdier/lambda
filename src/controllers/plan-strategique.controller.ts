import { Body, Controller, Post, Get } from '@nestjs/common';
import { PlanStrategiqueService } from '../services';
import { PlanStrategiqueDto } from '../dto/plan-strategique.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Plan strategiques')
@Controller('plan-strategiques')
export class PlanStratégiqueController {
  constructor(private readonly planStrategiqueService: PlanStrategiqueService) {}

  @Post()
  async postRole(@Body() planStrategiqueDto: PlanStrategiqueDto) {
    return await this.planStrategiqueService.postPlanStrategique(planStrategiqueDto);
  }

  @Get()
  async getViewPlanStrategique() {
    const response = await this.planStrategiqueService.getViewPlanStrategique();
    return response;
  }
}
