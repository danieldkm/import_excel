import Log from '../infra/typeorm/entities/Log';
import IFindAllByUserIdDTO from '../dtos/IFindAllByUserIdDTO';

export default interface ILogsRepository {
  findAllByUserId(data: IFindAllByUserIdDTO): Promise<Log[]>;
}
