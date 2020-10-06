import { injectable, inject } from 'tsyringe';
import fs from 'fs';
import path from 'path';
import { Response } from 'express';

import IExcelProvider from '@shared/container/providers/ExcelProvider/models/IExcelProvider';
import IColumn from '@shared/container/providers/ExcelProvider/models/IColumn';
import IRow from '@shared/container/providers/ExcelProvider/models/IRow';
// import { classToClass } from 'class-transformer';
import Log from '../infra/typeorm/entities/Log';
import ILogsRepository from '../repositories/ILogsRepository';
import IHitsRepository from '../repositories/IHitsRepository';

interface IRequest {
  user_id: string;
}

@injectable()
export default class DownloadHitsByReadExcelLocallyService {
  constructor(
    @inject('LogsRepository')
    private logsRepository: ILogsRepository,
    @inject('ExcelProvider')
    private excelProvider: IExcelProvider,
    @inject('HitsRepository')
    private hitsRepository: IHitsRepository,
  ) {}

  public async execute(response: Response): Promise<Response | undefined> {
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
    // const file = fs.readFileSync(filePath);
    // console.log('file', file);

    const sheets = await this.excelProvider.read({
      from: 'file',
      file: filePath,
      worksheet: 'BASE GERAL',
    });

    if (!sheets) {
      return undefined;
    }
    // console.log('sheets', sheets);
    const columns: Array<Partial<IColumn>> = sheets.columns;
    // columns.forEach(column => console.log('column', column.values[1]));
    if (!columns[0] || !columns) {
      console.log('!column', !columns);
      return undefined;
    }

    const indexCpf = columns.findIndex(
      column => column.values && column.values[1] === 'cpf',
    );
    const indexPeriodo = columns.findIndex(
      column => column.values && column.values[1] === 'PERÍODO',
    );
    const size = columns[indexCpf].values?.length || 0;
    const datas = [];
    for (let j = 2; j < 10; j++) {
      const cpf = columns[indexCpf].values[j].toString().replace(/[ ,.-]/g, '');
      const periodo = columns[indexPeriodo].values[j] || 0;
      console.log(cpf, periodo);
      const hits = await this.hitsRepository.findAllByCPFAndPeriod({
        cpf,
        period: periodo?.toString(),
      });
      datas = datas.concat(hits);
      // columns[indexCpf].values && columns[indexCpf].values[j]
      //   ? columns[indexCpf].values[j].toString().replace(/[ ,.]/g, '')
      //   : '';
    }
    console.log('datas', datas);
    if (datas.length === 0) {
      return undefined;
    }
    const fields = this.excelProvider.transformProperties(datas[0]);

    // const teste = await this.hitsRepository.findAllByCPF({ cpf: 'teste' });
    // // console.log('teste', teste);
    // const fields = this.excelProvider.transformProperties(teste[0]);

    const returnResponse: Response | undefined = await this.excelProvider.write(
      {
        columns: fields,
        data: datas,
        filename: `log_acessos_colaborar_${new Date().getTime()}.xlsx`,
        worksheet_name: 'acessos',
        response,
      },
    );

    return returnResponse;
  }
}
