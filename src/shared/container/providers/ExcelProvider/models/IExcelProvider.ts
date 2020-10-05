import IReadParamsExcel from '../dtos/IReadParamsExcel';
export default interface IExcelProvider {
  read(data: IReadParamsExcel): Promise<any>;
}
