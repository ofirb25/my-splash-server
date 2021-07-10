import Koa from 'koa';
import routes from './routes'
import logger from 'koa-logger';
import cors from '@koa/cors';

const app = new Koa();

app.use(logger())
app.use(cors());
app.use(routes.routes());
app.use(routes.allowedMethods())

app.listen(3001);


console.log('server started on port 3001')
