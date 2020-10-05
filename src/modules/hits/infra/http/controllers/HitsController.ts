import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListLogsByUserService from '@modules/hits/services/ListLogsByUserService';

export default class HitsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;

    const listLogsByUserService = container.resolve(ListLogsByUserService);

    const appointment = await listLogsByUserService.execute({
      user_id,
    });
    return response.json(appointment);
  }
}
