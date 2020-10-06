import Log from '../infra/typeorm/entities/Log';
import IFindAllByUserIdDTO from '../dtos/IFindAllByUserIdDTO';
import IFindAllByCPFDTO from '../dtos/IFindAllByCPFDTO';

export default interface ILogsRepository {
  findAllByUserId(data: IFindAllByUserIdDTO): Promise<Log[]>;
}
