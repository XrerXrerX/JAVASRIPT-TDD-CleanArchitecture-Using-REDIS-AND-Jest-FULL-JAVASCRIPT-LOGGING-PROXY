const ContentRepository = require('../ContentRepository');

describe('contentRepository interface', () => {
    describe('metadata interface', () => {
        it('should throw an error whe invoke abstract behavior', async () => {
            //arrange
            const contentRepository = new ContentRepository()
            //action and Assertion
            await expect(contentRepository.editmtdt({})).rejects.toThrowError('CONTENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
            await expect(contentRepository.gettmtdt({})).rejects.toThrowError('CONTENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        });
    });
    describe('sitemap interface', () => {

        it('should throw an error whe invoke abstract behavior', async () => {
            //arrange
            const contentRepository = new ContentRepository()
            //action and Assertion
            await expect(contentRepository.addstmp({})).rejects.toThrowError('CONTENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
            await expect(contentRepository.checkstmp({})).rejects.toThrowError('CONTENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
            await expect(contentRepository.editstmp({})).rejects.toThrowError('CONTENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
            await expect(contentRepository.getstmp({})).rejects.toThrowError('CONTENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
            await expect(contentRepository.delstmp({})).rejects.toThrowError('CONTENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');

        });
    });

    describe('GENERAL  interface', () => {

        it('should throw an error whe invoke abstract behavior', async () => {
            //arrange
            const contentRepository = new ContentRepository()
            //action and Assertion
            await expect(contentRepository.editgeneral({})).rejects.toThrowError('CONTENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
            await expect(contentRepository.getgeneral({})).rejects.toThrowError('CONTENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        });
    });
    describe('SLIDER  interface', () => {

        it('should throw an error whe invoke abstract behavior', async () => {
            //arrange
            const contentRepository = new ContentRepository()
            //action and Assertion
            await expect(contentRepository.editslider({})).rejects.toThrowError('CONTENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
            await expect(contentRepository.getslider({})).rejects.toThrowError('CONTENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        });
    });

    describe('Link  interface', () => {

        it('should throw an error whe invoke abstract behavior', async () => {
            //arrange
            const contentRepository = new ContentRepository()
            //action and Assertion
            await expect(contentRepository.editlink({})).rejects.toThrowError('CONTENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
            await expect(contentRepository.getlink({})).rejects.toThrowError('CONTENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        });
    });

    describe('Socmed  interface', () => {

        it('should throw an error whe invoke abstract behavior', async () => {
            //arrange
            const contentRepository = new ContentRepository()
            //action and Assertion
            await expect(contentRepository.editsocmed({})).rejects.toThrowError('CONTENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
            await expect(contentRepository.getsocmed({})).rejects.toThrowError('CONTENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        });
    });

    describe('Promo  interface', () => {

        it('should throw an error whe invoke abstract behavior', async () => {
            //arrange
            const contentRepository = new ContentRepository()
            //action and Assertion
            await expect(contentRepository.addpromo({})).rejects.toThrowError('CONTENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
            await expect(contentRepository.editpromo({})).rejects.toThrowError('CONTENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
            await expect(contentRepository.getpromo({})).rejects.toThrowError('CONTENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
            await expect(contentRepository.deletepromo({})).rejects.toThrowError('CONTENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');

        });
    });

    describe('MT interface', () => {

        it('should throw an error whe invoke abstract behavior', async () => {
            //arrange
            const contentRepository = new ContentRepository()
            //action and Assertion
            await expect(contentRepository.editmt({})).rejects.toThrowError('CONTENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
            await expect(contentRepository.getmt({})).rejects.toThrowError('CONTENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');

        });

    });

});