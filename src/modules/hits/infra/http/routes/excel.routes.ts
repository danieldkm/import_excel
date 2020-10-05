import { Router } from 'express';

import ExcelController from '../controllers/ExcelController';

const excelRouter = Router();
const excelController = new ExcelController();

excelRouter.get('/read/locally', excelController.show);

export default excelRouter;
