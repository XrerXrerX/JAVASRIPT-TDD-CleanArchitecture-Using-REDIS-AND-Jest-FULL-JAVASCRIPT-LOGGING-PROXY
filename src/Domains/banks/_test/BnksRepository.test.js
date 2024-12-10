const BnksRepository = require('../BnksRepository');

describe('apkRepository reddis interface', () => {

    it('should throw an error whe invoke abstract behavior on add group', async () => {
        const bnksRepository = new BnksRepository()
        await expect(bnksRepository.addgrp()).rejects.toThrowError('BNKS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        await expect(bnksRepository.edtgrp()).rejects.toThrowError('BNKS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        await expect(bnksRepository.getdtGroup()).rejects.toThrow('BNKS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        await expect(bnksRepository.delgroup()).rejects.toThrow('BNKS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        await expect(bnksRepository.findgroup()).rejects.toThrow('BNKS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    });

    it('should throw an error whe invoke abstract behavior on add group', async () => {
        const bnksRepository = new BnksRepository()
        await expect(bnksRepository.chckmstr()).rejects.toThrowError('BNKS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        await expect(bnksRepository.addmstr()).rejects.toThrowError('BNKS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        await expect(bnksRepository.putmstrbnk()).rejects.toThrowError('BNKS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        await expect(bnksRepository.getmstrbnk()).rejects.toThrowError('BNKS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        await expect(bnksRepository.delmstrbnk()).rejects.toThrowError('BNKS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        await expect(bnksRepository.findmstr()).rejects.toThrowError('BNKS_REPOSITORY.METHOD_NOT_IMPLEMENTED');

    });
    it('should throw an error whe invoke abstract behavior', async () => {
        //arrange
        const bnksRepository = new BnksRepository()
        //action and Assertion
        await expect(bnksRepository.chckbnks()).rejects.toThrowError('BNKS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        await expect(bnksRepository.chckedybnks()).rejects.toThrowError('BNKS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        await expect(bnksRepository.addbnks()).rejects.toThrowError('BNKS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        await expect(bnksRepository.putbnks()).rejects.toThrowError('BNKS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        await expect(bnksRepository.getbnks()).rejects.toThrowError('BNKS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        await expect(bnksRepository.getbnkex()).rejects.toThrowError('BNKS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        await expect(bnksRepository.getgroupbnks()).rejects.toThrowError('BNKS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        await expect(bnksRepository.getmasterbnks()).rejects.toThrowError('BNKS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        await expect(bnksRepository.findbank()).rejects.toThrowError('BNKS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        await expect(bnksRepository.delbnks()).rejects.toThrowError('BNKS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    });


    it('should throw an error whe invoke abstract behavior', async () => {
        //arrange
        const bnksRepository = new BnksRepository()
        //action and Assertion
        await expect(bnksRepository.checkbnks()).rejects.toThrowError('BNKS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        await expect(bnksRepository.databnksdp()).rejects.toThrowError('BNKS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    });


    it('should throw an error whe invoke abstract behavior when edit delete group array bank', async () => {
        //arrange
        const bnksRepository = new BnksRepository()
        //action and Assertion
        await expect(bnksRepository.editbankar()).rejects.toThrowError('BNKS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        await expect(bnksRepository.checkbankar()).rejects.toThrowError('BNKS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        await expect(bnksRepository.delbankar()).rejects.toThrowError('BNKS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        await expect(bnksRepository.findbankarr()).rejects.toThrowError('BNKS_REPOSITORY.METHOD_NOT_IMPLEMENTED');

    });


});