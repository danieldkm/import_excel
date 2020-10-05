import IExcelProvider from '../models/IExcelProvider';
import IReadParamsExcel from '../dtos/IReadParamsExcel';

export default class FakeExcelProvider implements IExcelProvider {
  public async read(data: IReadParamsExcel): Promise<any> {
    return 'teste';
  }
}
