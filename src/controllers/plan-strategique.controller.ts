import { Body, Controller, Post, Get } from '@nestjs/common';
import { PlanStrategiqueService } from '../services';
import { PlanStrategiqueDto } from '../dto/plan-strategique.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../decorators/public.decorator';

@ApiTags('Plan strategiques')
@Controller('plan-strategiques')
export class PlanStratégiqueController {
  constructor(private readonly planStrategiqueService: PlanStrategiqueService) {}

  @Post()
  @Public()
  async postRole(@Body() planStrategiqueDto: PlanStrategiqueDto) {
    return await this.planStrategiqueService.postPlanStrategique(planStrategiqueDto);
  }

  @Get()
  @Public()
  async getViewPlanStrategique() {
    const response = await this.planStrategiqueService.getViewPlanStrategique();
    return response;
  }
}
