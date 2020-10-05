import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListHitsByReadExcelLocallyService from '@modules/hits/services/ListHitsByReadExcelLocallyService';

export default class ExcelController {
  public async show(request: Request, response: Response): Promise<Response> {
    const listHitsByReadExcelLocallyService = container.resolve(
      ListHitsByReadExcelLocallyService,
    );

    const appointment = await listHitsByReadExcelLocallyService.execute();
    return response.json(appointment);
  }
}
