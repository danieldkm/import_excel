import { getRepository, Repository, Raw } from 'typeorm';

import ILogsRepository from '@modules/hits/repositories/ILogsRepository';
import IFindAllByUserIdDTO from '@modules/hits/dtos/IFindAllByUserIdDTO';

import Log from '../entities/Log';

class LogsRepository implements ILogsRepository {
  private ormRepository: Repository<Log>;

  constructor() {
    this.ormRepository = getRepository(Log);
  }

  public async findAllByUserId({
    user_id,
  }: IFindAllByUserIdDTO): Promise<Log[]> {
    const logs = await this.ormRepository.find({
      where: {
        USUARIO_ID: user_id,
      },
      take: 10,
    });
    return logs;
  }
}

export default LogsRepository;
