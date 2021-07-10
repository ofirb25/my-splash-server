import Router from 'koa-router';
import controller from '../controllers/unsplash.controller'

const router = new Router();


router.get('/photos', controller.getRandom);
router.get('/photos/search', controller.search);
export default router.routes();