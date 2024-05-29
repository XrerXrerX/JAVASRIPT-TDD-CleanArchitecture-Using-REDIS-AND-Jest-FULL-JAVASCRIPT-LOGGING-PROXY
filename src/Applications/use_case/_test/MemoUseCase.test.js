const AddMemo = require('../../../Domains/memo/entities/AddMemo');
const MemoRepository = require('../../../Domains/memo/MemoRepository');
const MemoUseCase = require('../MemoUseCase');
const CacheService = require('../../caching/CacheService');

describe('MEMO', () => {

    describe('AddMemo data', () => {
        it('should orchestrating add memo correctly', async () => {
            const useCasePayload = new AddMemo({
                statustype: 1,
                statuspriority: 1,
                subject: 'ini contoh subject 50 character',
                memo: 'ini contoh memo unlimited length character ini contoh memo unlimited length characterini contoh memo unlimited length character',
            });
            const resultadd = 'Add memo Success !';

            const mockcacheService = new CacheService();
            const mockmemoRepository = new MemoRepository();

            mockmemoRepository.addmemo = jest.fn()
                .mockImplementation(() => Promise.resolve(resultadd));
            mockcacheService.delete = jest.fn().mockResolvedValue();


            const addmemoUsecase = new MemoUseCase({
                memoRepository: mockmemoRepository,
                cacheServices: mockcacheService
            });

            const datamemousecase = await addmemoUsecase.addmemomem(useCasePayload);

            expect(datamemousecase).toStrictEqual(resultadd);
            expect(mockmemoRepository.addmemo).toBeCalledWith(useCasePayload);
            expect(mockcacheService.delete).toBeCalledWith(`memo:memo`);
        });
    });
    describe('getdatamemo VIP that already create', () => {
        it("should get data memo caching", async () => {
            const resultmemo = [
                {
                    idmemo: 1,
                    statustype: 1,
                    statuspriority: 1,
                    subject: 'ini contoh subject 50 character',
                    memo: 'ini contoh memo unlimited length character ini contoh memo unlimited length characterini contoh memo unlimited length character',
                    created_at: '2024-02-24T15:25:51.326Z',

                },
                {
                    idmemo: 2,
                    statustype: 1,
                    statuspriority: 2,
                    subject: 'ini contoh subject 50 character',
                    memo: 'ini contoh memo unlimited length character ini contoh memo unlimited length characterini contoh memo unlimited length character',
                    created_at: '2024-02-24T15:25:51.326Z',

                }
            ];



            const mockcacheService = new CacheService();
            mockcacheService.get = jest.fn().mockResolvedValue(JSON.stringify(resultmemo));

            const getMemoUsecase = new MemoUseCase({
                cacheServices: mockcacheService
            });

            const payload = await getMemoUsecase.getmemodt();

            expect(mockcacheService.get).toBeCalledWith(`memo:memo`);
            expect(payload).toEqual(
                resultmemo
            );
        });
        it('should get data memo bank', async () => {

            const resultmemo = [
                {
                    idmemo: 1,
                    statustype: 1,
                    statuspriority: 1,
                    subject: 'ini contoh subject 50 character',
                    memo: 'ini contoh memo unlimited length character ini contoh memo unlimited length characterini contoh memo unlimited length character',
                    created_at: '2024-02-24T15:25:51.326Z',

                },
                {
                    idmemo: 2,
                    statustype: 1,
                    statuspriority: 2,
                    subject: 'ini contoh subject 50 character',
                    memo: 'ini contoh memo unlimited length character ini contoh memo unlimited length characterini contoh memo unlimited length character',
                    created_at: '2024-02-24T15:25:51.326Z',

                }
            ];

            const mockcacheService = new CacheService();
            const mockMemoRepository = new MemoRepository();


            mockMemoRepository.getmemo = jest.fn()
                .mockImplementation(() => Promise.resolve(resultmemo));
            mockcacheService.delete = jest.fn().mockResolvedValue();
            mockcacheService.set = jest.fn().mockResolvedValue();

            const getMemoUsecase = new MemoUseCase({
                memoRepository: mockMemoRepository,
                cacheServices: mockcacheService

            });

            const payload = await getMemoUsecase.getmemodt();

            expect(mockMemoRepository.getmemo)
                .toBeCalledWith();
            expect(payload).toEqual(resultmemo);
            expect(mockcacheService.delete).toBeCalledWith(`memo:memo`);
            expect(mockcacheService.set).toBeCalledWith(`memo:memo`, JSON.stringify(resultmemo));
        });
    });

    describe('getdatamemo that already create', () => {
        it("should get data memo caching", async () => {
            const params = {
                statustype: 1
            }

            const resultmemo = [
                {
                    idmemo: 1,
                    statustype: 1,
                    statuspriority: 1,
                    subject: 'ini contoh subject 50 character',
                    memo: 'ini contoh memo unlimited length character ini contoh memo unlimited length characterini contoh memo unlimited length character',
                    created_at: '2024-02-24T15:25:51.326Z',

                },
                {
                    idmemo: 2,
                    statustype: 1,
                    statuspriority: 1,
                    subject: 'ini contoh subject 50 character',
                    memo: 'ini contoh memo unlimited length character ini contoh memo unlimited length characterini contoh memo unlimited length character',
                    created_at: '2024-02-24T15:25:51.326Z',

                }
            ];



            const mockcacheService = new CacheService();
            mockcacheService.get = jest.fn().mockResolvedValue(JSON.stringify(resultmemo));

            const getMemoUsecase = new MemoUseCase({
                cacheServices: mockcacheService
            });

            const payload = await getMemoUsecase.getmemodtall(params);

            expect(mockcacheService.get).toBeCalledWith(`memoll:${params.statustype}`);
            expect(payload).toEqual(
                resultmemo
            );
        });
        it('should get data memo bank', async () => {

            const params = {
                statustype: 1
            }


            const resultmemo = [
                {
                    idmemo: 1,
                    statustype: 1,
                    statuspriority: 1,
                    subject: 'ini contoh subject 50 character',
                    memo: 'ini contoh memo unlimited length character ini contoh memo unlimited length characterini contoh memo unlimited length character',
                    created_at: '2024-02-24T15:25:51.326Z',

                },
                {
                    idmemo: 2,
                    statustype: 1,
                    statuspriority: 1,
                    subject: 'ini contoh subject 50 character',
                    memo: 'ini contoh memo unlimited length character ini contoh memo unlimited length characterini contoh memo unlimited length character',
                    created_at: '2024-02-24T15:25:51.326Z',
                }
            ];

            const mockcacheService = new CacheService();
            const mockMemoRepository = new MemoRepository();


            mockMemoRepository.getmemomem = jest.fn()
                .mockImplementation(() => Promise.resolve(resultmemo));
            mockcacheService.delete = jest.fn().mockResolvedValue();
            mockcacheService.set = jest.fn().mockResolvedValue();

            const getMemoUsecase = new MemoUseCase({
                memoRepository: mockMemoRepository,
                cacheServices: mockcacheService

            });

            const payload = await getMemoUsecase.getmemodtall(params);

            expect(mockMemoRepository.getmemomem)
                .toBeCalledWith(params.statustype);
            expect(payload).toEqual(resultmemo);
            expect(mockcacheService.delete).toBeCalledWith(`memoll:${params.statustype}`);
            expect(mockcacheService.set).toBeCalledWith(`memoll:${params.statustype}`, JSON.stringify(resultmemo));
        });
    });

    describe("delete  group bank for master data", () => {
        it("should delete data group succesfully", async () => {

            params = {
                idmemo: 12
            }

            resultdelete = "success delete memo";
            const mockcacheService = new CacheService();
            const mockMemoRepository = new MemoRepository();

            mockMemoRepository.findmemo = jest.fn()
                .mockImplementation(() => Promise.resolve());
            mockMemoRepository.deletememo = jest.fn()
                .mockImplementation(() => Promise.resolve(resultdelete));
            mockcacheService.delete = jest.fn().mockResolvedValue();



            const deletememousecase = new MemoUseCase({
                memoRepository: mockMemoRepository,
                cacheServices: mockcacheService
            });

            const datasuccess = await deletememousecase.delmemodata(params);

            expect(mockMemoRepository.findmemo)
                .toBeCalledWith(params.idmemo);
            expect(mockMemoRepository.deletememo)
                .toBeCalledWith(params.idmemo);
            expect(mockcacheService.delete).toBeCalledWith(`memo:memo`);
            expect(datasuccess).toEqual(resultdelete);



        });
    });

});






