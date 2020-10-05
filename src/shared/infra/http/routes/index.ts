import { Router } from 'express';
import hitsRoutes from '@modules/hits/infra/http/routes/hits.routes';
import excelRoutes from '@modules/hits/infra/http/routes/excel.routes';
// import providersRouter from '@modules/appointments/infra/http/routes/providers.routes';
// import usersRouter from '@modules/users/infra/http/routes/users.routes';
// import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
// import passwordRouter from '@modules/users/infra/http/routes/password.routes';
// import profileRouter from '@modules/users/infra/http/routes/profile.routes';

const router = Router();

router.use('/hits', hitsRoutes);
router.use('/hits/excel', excelRoutes);
// router.use('/providers', providersRouter);
// router.use('/users', usersRouter);
// router.use('/sessions', sessionsRouter);
// router.use('/password', passwordRouter);
// router.use('/profile', profileRouter);
export default router;
