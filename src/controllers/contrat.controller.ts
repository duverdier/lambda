import { Body, Controller, Post, Get, Param, ParseIntPipe, Put } from '@nestjs/common';
import { ContratService } from '../services';
import { ContratDto } from '../dto/contrat.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Contrats')
@Controller('contrats')
export class ContratController {
  constructor(private readonly contratService: ContratService) {}

  @Get()
  async getContrats() {
    const response = await this.contratService.getContrats();
    return response;
  }

  @Post()
  async createContrat(@Body() contratDto: ContratDto) {
    const response = await this.contratService.createContrat(contratDto);
    return response;
  }

  @Get(':id')
  async getContratById(@Param('id', ParseIntPipe) id: number) {
    return await this.contratService.getContratById(+id);
  }

  @Put(':id')
  async updateContrat(@Body() contratDto: ContratDto, @Param('id', ParseIntPipe) id: number) {
    const response = await this.contratService.updateContrat(+id, contratDto);
    return response;
  }
}
