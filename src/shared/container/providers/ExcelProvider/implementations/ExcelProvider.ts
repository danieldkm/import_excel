import Excel, { Worksheet, WorksheetModel, WorkbookModel } from 'exceljs';
import fs from 'fs';

import IExcelProvider from '../models/IExcelProvider';
import IReadParamsExcel from '../dtos/IReadParamsExcel';

// import IWorkBookDTO from '../dtos/IWorkBookDTO';
// import IWorksheetDTO from '../dtos/IWorksheetDTO';

export interface models {
  WorksheetModel: WorksheetModel;
  WorkbookModel: WorkbookModel;
}

export default class ExcelProvider implements IExcelProvider {
  public async read({
    file,
    from,
    worksheet,
  }: IReadParamsExcel): Promise<Worksheet | Worksheet[] | undefined> {
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

    const works: Worksheet[] | undefined = datas?.worksheets;
    return works;
  }
}
