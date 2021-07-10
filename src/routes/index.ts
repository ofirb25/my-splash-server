import Router from 'koa-router';
import unsplashRoutes from './unsplash.routes';
const api = new Router();
const router = new Router();


api.use(unsplashRoutes);

router.use('/api', api.routes());

export default router;

