import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
// import { classToClass } from 'class-transformer';
import Log from '../infra/typeorm/entities/Log';
import ILogsRepository from '../repositories/ILogsRepository';

interface IRequest {
  user_id: string;
}

@injectable()
export default class ListLogsByUserService {
  constructor(
    @inject('LogsRepository')
    private logsRepository: ILogsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Log[]> {
    const cacheKey = `provider-logs:${user_id}`;
    // let logs = await this.cacheProvider.recover<Log[]>(cacheKey);

    console.log('user_id', user_id);
    // if (!logs) {
    const logs = await this.logsRepository.findAllByUserId({ user_id });
    console.log('logs', logs);

    await this.cacheProvider.save(cacheKey, logs);
    // }

    return logs;
  }
}
