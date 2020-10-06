import { Response } from 'express';
import { IField } from '../utils/TransformRelScheduler';
export default interface IWriteParamsExcel {
  columns: IField[];
  data: any;
  worksheet_name: string;
  filename: string;
  response: Response;
}
