const MemoRepository = require('../MemoRepository');

describe('MemoRepository', () => {

    it('should throw an error whe invoke abstract behavior on add group', async () => {
        const memoRepository = new MemoRepository()
        await expect(memoRepository.addmemo()).rejects.toThrowError('MEMO_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        await expect(memoRepository.getmemo()).rejects.toThrowError('MEMO_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        await expect(memoRepository.getmemomem()).rejects.toThrowError('MEMO_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        await expect(memoRepository.deletememo()).rejects.toThrowError('MEMO_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        await expect(memoRepository.findmemo()).rejects.toThrowError('MEMO_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    });

});