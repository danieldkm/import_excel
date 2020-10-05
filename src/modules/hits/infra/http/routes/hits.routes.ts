import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import HitsController from '../controllers/HitsController';

const logsRouter = Router();
const hitsController = new HitsController();

logsRouter.get(
  '/:user_id',
  celebrate({
    [Segments.BODY]: {
      user_id: Joi.string().required(),
    },
  }),
  hitsController.index,
);

export default logsRouter;
