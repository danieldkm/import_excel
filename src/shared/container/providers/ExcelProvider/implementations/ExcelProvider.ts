import Excel, { Worksheet, Column } from 'exceljs';
import fs from 'fs';
import { Response } from 'express';

import IExcelProvider from '../models/IExcelProvider';
import IReadParamsExcel from '../dtos/IReadParamsExcel';
import IWriteParamsExcel from '../dtos/IWriteParamsExcel';

import TransformRelScheduler, { IField } from '../utils/TransformRelScheduler';
const transformRelScheduler = new TransformRelScheduler();

export interface models {
  Worksheet: Worksheet;
  Column: Column;
}

export default class ExcelProvider implements IExcelProvider {
  transformProperties(data: any): IField[] {
    const fields = Object.getOwnPropertyNames(data).map(property => {
      return transformRelScheduler.execute(property, 'excel');
    });
    return fields;
  }

  async write({
    columns,
    data,
    filename,
    response,
    worksheet_name,
  }: IWriteParamsExcel): Promise<Response | undefined> {
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet(worksheet_name);

    worksheet.columns = columns;

    // Add Array Rows
    worksheet.addRows(data);

    response.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    response.setHeader(
      'Content-Disposition',
      'attachment; filename=' + filename,
    );

    await workbook.xlsx.write(response);

    return response;
    // .then(function () {
    // })
    // .catch(e => {
    //   console.log('error.excel.write', e);
    //   return undefined;
    // });
  }

  public async read({
    file,
    from,
    worksheet,
  }: IReadParamsExcel): Promise<Worksheet | undefined> {
    const workbook = new Excel.Workbook();
    let datas;

    if (from === 'file') {
      datas = await workbook.xlsx.readFile(file);
    } else if (from === 'stream') {
      const readStream = fs.createReadStream(file);
      datas = await workbook.xlsx.read(readStream);
    } else if (from === 'buffer') {
      const data = fs.readFileSync(file);
      datas = await workbook.xlsx.load(data);
    }

    if (datas && worksheet) {
      const work: Worksheet | undefined = datas.worksheets.find(
        (ws: Worksheet) => ws.name === worksheet,
      );
      return work;
    }
    return undefined;

    // const works: Worksheet[] | undefined = datas?.worksheets;
    // return works;
  }
}
