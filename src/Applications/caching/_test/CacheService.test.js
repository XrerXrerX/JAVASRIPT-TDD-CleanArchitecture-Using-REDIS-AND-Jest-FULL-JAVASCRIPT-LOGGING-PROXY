const CacheService = require('../CacheService');

describe('CacheService interface', () => {
    it('should throw error when invoke unimplemented method', async () => {
        // Arrange
        const cacheService = new CacheService();

        // Action & Assert
        await expect(cacheService.set('')).rejects.toThrowError('REDIS.METHOD_NOT_IMPLEMENTED');
        await expect(cacheService.get('')).rejects.toThrowError('REDIS.METHOD_NOT_IMPLEMENTED');
        await expect(cacheService.delete('')).rejects.toThrowError('REDIS.METHOD_NOT_IMPLEMENTED');
    });
});
