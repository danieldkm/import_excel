import { container } from 'tsyringe';

import IExcelProvider from './models/IExcelProvider';

import ExcelProvider from './implementations/ExcelProvider';

const providers = {
  excel: ExcelProvider,
};

container.registerSingleton<IExcelProvider>('ExcelProvider', providers.excel);
