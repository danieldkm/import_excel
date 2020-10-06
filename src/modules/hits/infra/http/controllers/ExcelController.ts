import { Request, Response } from 'express';
import { container } from 'tsyringe';

import DownloadHitsByReadExcelLocallyService from '@modules/hits/services/DownloadHitsByReadExcelLocallyService';

export default class ExcelController {
  public async show(
    request: Request,
    response: Response,
  ): Promise<Response | void> {
    const downloadHitsByReadExcelLocallyService = container.resolve(
      DownloadHitsByReadExcelLocallyService,
    );

    const downloadResponse = await downloadHitsByReadExcelLocallyService.execute(
      response,
    );

    if (downloadResponse) {
      return response.status(200).end();
    }

    return response.status(500).send('fail');
  }
}
