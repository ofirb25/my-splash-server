import axios from 'axios';
import redisClient from '../redis/client'

const unsplashInternalRoutes = {
    getRandom: (page: string) =>  `/photos?page=${page}`,
    search: (term: string, page: string)  => `/search/photos?query=${term}&page=${page}`
}

async function requestUnsplash(route: string) {
   
   let res;
    try {
        res = await axios.get(`https://api.unsplash.com${route}&client_id=6DDNMxG8lcBs5AMlOZxxR42sJroVudxv93iiIfMBk4w`, {
            headers: {
                Authorization: 'CLIENT_ID 6DDNMxG8lcBs5AMlOZxxR42sJroVudxv93iiIfMBk4w'
            }
        });   
    } catch (e) {
        console.log(e)
        res = e;
    }
     
    return res.data;
}

const controller = {
    getRandom: async (ctx: any, next: any) => {
        const redisKey = `random_${ctx.url.split('/photos')[1]}`;
        const cache = await redisClient.getAsync(redisKey);
        const res = cache ? JSON.parse(cache) : await requestUnsplash(unsplashInternalRoutes.getRandom(ctx.query.page));
        ctx.body = res;
        if(!cache) {
            console.log({redisKey, res})
            redisClient.client.setex(redisKey, 60 * 60, JSON.stringify(res))
        }
    },
    search: async (ctx: any) => {
        const redisKey = ctx.request.url.split('photos/')[1];
        const cache = await redisClient.getAsync(redisKey);
        const res = cache ? JSON.parse(cache) :  await requestUnsplash(unsplashInternalRoutes.search(ctx.query.term, ctx.query.page))
        ctx.body = res
        if (!cache) {
            redisClient.client.setex(redisKey, 60 * 60, JSON.stringify(res))
        }
    }
}

export default controller;

