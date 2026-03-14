import { Router } from 'express';

import weatherRoutes from './weather.route';

const router = Router();

router.use('/weather', weatherRoutes);

export default router;
