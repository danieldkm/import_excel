import ILogsRepository from '@modules/hits/repositories/ILogsRepository';

import Log from '@modules/hits/infra/typeorm/entities/Log';
import IFindAllByUserIdDTO from '@modules/hits/dtos/IFindAllByUserIdDTO';

class FakeLogRepository implements ILogsRepository {
  private logs: Log[] = [];
  constructor() {
    const log = new Log();
    const data = new Date();
    Object.assign(log, {
      id: 'teste1',
      usuario_id: 'user1',
      data,
      browser:
        'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.125 Safari/537.36',
      ip: '200.180.193.5',
    });

    this.logs.push(log);
  }

  public async findAllByUserId({
    user_id,
  }: IFindAllByUserIdDTO): Promise<Log[]> {
    const logs = this.logs.filter(log => log.usuario_id === user_id);

    return logs;
  }
}

export default FakeLogRepository;
