import redis from 'redis';
import { promisify } from "util";

const client = redis.createClient('6379');
client.on('error', (err) => {
    console.log("Error " + err)
});
const getAsync = promisify(client.get).bind(client);

export default {client, getAsync};