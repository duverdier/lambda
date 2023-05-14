import { Inject, Injectable } from '@nestjs/common';
import { Contrat } from '../entity/contrat.entity';

@Injectable()
export class ContratService {
  constructor(
    @Inject('CONTRAT_REPOSITORY')
    private readonly contratRepository: typeof Contrat,
  ) {}

  async createContrat(contrat: { id: number; label: string }) {
    return await this.contratRepository.create<Contrat>({ label: contrat.label });
  }

  getContrats() {
    return this.contratRepository.findAll<Contrat>();
  }

  async getContratById(id: number) {
    return await this.contratRepository.findOne<Contrat>({
      where: { id },
      raw: true,
      nest: true,
    });
  }

  async updateContrat(id: number, data: any) {
    return await this.contratRepository.update(data, { where: { id } });
  }
}
