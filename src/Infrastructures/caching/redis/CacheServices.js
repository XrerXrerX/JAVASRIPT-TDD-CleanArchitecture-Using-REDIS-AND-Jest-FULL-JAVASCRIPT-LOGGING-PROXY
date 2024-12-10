const redis = require('redis');
const CacheService = require('../../../Applications/caching/CacheService');

// class CacheServices extends CacheService {
class CacheServices {

    constructor() {
        this._client = redis.createClient({
            socket: {
                host: process.env.REDIS_SERVER,
            },
        });
        // this._client.on('error', (error) => {
        //     console.error(error);
        // });
        this._client.connect();
    }

    async set(key, value, expirationInSecond = 43200) {
        await this._client.set(key, value, {
            EX: expirationInSecond,
        });
    }


    async get(key) {
        const result = await this._client.get(key);
        if (result === null) throw new Error('Cache tidak ditemukan');
        return result;
    }

    async delete(key) {
        return this._client.del(key);
    }
}

module.exports = CacheServices;