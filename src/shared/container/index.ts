import { container } from 'tsyringe';

// import "@modules/users/providers";
import './providers';

import ILogsRepository from '@modules/hits/repositories/ILogsRepository';
import LogsRepository from '@modules/hits/infra/typeorm/repositories/LogsRepository';

import IHitsRepository from '@modules/hits/repositories/IHitsRepository';
import HitsRepository from '@modules/hits/infra/typeorm/repositories/HitsRepository';

container.registerSingleton<ILogsRepository>('LogsRepository', LogsRepository);
container.registerSingleton<IHitsRepository>('HitsRepository', HitsRepository);
