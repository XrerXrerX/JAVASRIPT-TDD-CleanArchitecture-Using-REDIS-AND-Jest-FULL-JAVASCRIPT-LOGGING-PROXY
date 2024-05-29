class CacheService {
    async set(key, value, expirationInSecond) {
        throw new Error('REDIS.METHOD_NOT_IMPLEMENTED');
    }

    async get(key) {
        throw new Error('REDIS.METHOD_NOT_IMPLEMENTED');
    }

    async delete(key) {
        throw new Error('REDIS.METHOD_NOT_IMPLEMENTED');
    }


}

module.exports = CacheService;