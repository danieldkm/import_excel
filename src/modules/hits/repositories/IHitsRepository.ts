import Log from '../infra/typeorm/entities/Log';
import IFindAllByCPFDTO from '../dtos/IFindAllByCPFDTO';

export default interface IHitsRepository {
  findAllByCPFAndPeriod(data: IFindAllByCPFDTO): Promise<Log[]>;
}
