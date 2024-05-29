const redis = require('redis');
const CacheServices = require('../CacheServices');

describe('CacheService', () => {
    describe('CacheService set get delete', () => {
        let cacheService;

        beforeEach(() => {
            // Membuat instance CacheService sebelum setiap tes
            cacheService = new CacheServices();
        });

        afterEach(async () => {
            // Membersihkan cache setelah setiap tes
            await cacheService.delete('testKey');
        });

        it('should set data to the cache', async () => {
            await cacheService.set('testKey', 'testValue');
            const cachedValue = await cacheService.get('testKey');
            expect(cachedValue).toBe('testValue');
        });

        it('should throw error when getting non-existing cache', async () => {
            try {
                await cacheService.get('nonExistingKey');
            } catch (error) {
                expect(error.message).toBe('Cache tidak ditemukan');
            }
        });

        it('should delete data from the cache', async () => {
            await cacheService.set('testKey', 'testValue');
            await cacheService.delete('testKey');
            try {
                await cacheService.get('testKey');
            } catch (error) {
                expect(error.message).toBe('Cache tidak ditemukan');
            }
        });


    });
});
