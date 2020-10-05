import { injectable, inject } from 'tsyringe';
import fs from 'fs';
import path from 'path';

import IExcelProvider from '@shared/container/providers/ExcelProvider/models/IExcelProvider';
// import { classToClass } from 'class-transformer';
import Log from '../infra/typeorm/entities/Log';
import ILogsRepository from '../repositories/ILogsRepository';

interface IRequest {
  user_id: string;
}

@injectable()
export default class ListHitsByReadExcelLocallyService {
  constructor(
    @inject('LogsRepository')
    private logsRepository: ILogsRepository,
    @inject('ExcelProvider')
    private excelProvider: IExcelProvider,
  ) {}

  public async execute(): Promise<void> {
    const filePath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'tmp',
      'excel',
      'ENGAJAMENTO_81_Bolsas+e+Descontos+-.xlsx',
    );
    const file = fs.readFileSync(filePath);
    console.log('file', file);

    const sheets = await this.excelProvider.read({
      from: 'file',
      file: filePath,
      worksheet: 'BASE GERAL',
    });

    console.log('sheets', sheets);
  }
}
