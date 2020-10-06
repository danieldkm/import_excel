import { injectable, inject } from 'tsyringe';

import Log from '../infra/typeorm/entities/Log';
import IHitsRepository from '../repositories/IHitsRepository';

interface IRequest {
  cpf: string;
}

@injectable()
export default class FindHitsByCPFService {
  constructor(
    @inject('HitsRepository')
    private hitsRepository: IHitsRepository,
  ) {}

  public async execute({ cpf }: IRequest): Promise<any[]> {
    const result = await this.hitsRepository.findAllByCPFAndPeriod({
      cpf,
      period: '',
    });
    return result;
  }
}
