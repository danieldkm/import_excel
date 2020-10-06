import { Worksheet } from 'exceljs';
import { Response } from 'express';

import { IField } from '../utils/TransformRelScheduler';

import IWriteParamsExcel from '../dtos/IWriteParamsExcel';
import IReadParamsExcel from '../dtos/IReadParamsExcel';
export default interface IExcelProvider {
  read(data: IReadParamsExcel): Promise<Worksheet | undefined>;
  write(data: IWriteParamsExcel): Promise<Response | undefined>;
  transformProperties(data: any): IField[];
}
