const GetDataApkUseCase = require('../GetDataApkUseCase');
const CacheService = require('../../../Applications/caching/CacheService');

describe('APK DATA RESERVER API POST GET DATA', () => {
    it('should get data apk caching successfully', async () => {
        const params = {
            apkid: 'apk123'
        };

        const resultmocksettings = {
            masterdata: {
                apkid: 'apk123',
                version: '1.0.1',
                home: 'http://home.home',
                deposit: 'http://deposit.home',
                server1: 'http://server1.home',
                server2: 'http://server2.home',
                server3: 'http://server3.home',
                update: 'http://update.home',
                peraturan: 'http://peraturan.home',
                klasemen: 'http://klasemen.home',
                promosi: 'http://promosi.home',
                livescore: 'http://livescore.home',
                livechat: 'http://livechat.home',
                whatsapp1: 'http://whatsapp1.home',
                whatsapp2: 'http://whatsapp2.home',
                facebook: 'http://facebook.home',
                telegram: 'http://telegram.home',
                instagram: 'http://instagram.home',
                prediksi: 'http://prediksi.home',
            },
            events: [
                {
                    icongif: 'http://icongif.home#',
                    posisi: '1',
                    switchs: true,
                    bannerurl: 'http://update.home',
                    linkevent: 'http://peraturan.home'
                },
                {
                    icongif: 'http://icongif.home2',
                    posisi: '1',
                    switchs: true,
                    bannerurl: 'http://update.home2',
                    linkevent: 'http://peraturan.home2'
                }
            ],
            notice: [
                { title: 'fake title', content: 'ini ada content pemberitahuan' },
                { title: 'fake title2', content: 'ini ada content pemberitahuan2' }
            ],
            created_at: '2024-02-24T15:25:51.326Z',
            updated_at: '2024-02-24T15:25:51.326Z'
        };

        const mockcacheService = new CacheService();
        mockcacheService.get = jest.fn().mockResolvedValue(JSON.stringify(resultmocksettings));

        const getDataApkUseCase = new GetDataApkUseCase({
            cacheServices: mockcacheService
        });

        const dataapkusecase = await getDataApkUseCase.execute(params);

        expect(mockcacheService.get).toBeCalledWith(`apkid:${params.apkid}`);
        expect(dataapkusecase).toEqual({
            data: resultmocksettings,
            headers: {
                'X-Data-Source': 'cache',
            }
        });
    });

    it('should get data apk successfully', async () => {
        const params = {
            apkid: 'apk123'
        };

        const resultmocksettings = {
            masterdata: {
                apkid: 'apk123',
                version: '1.0.1',
                home: 'http://home.home',
                deposit: 'http://deposit.home',
                server1: 'http://server1.home',
                server2: 'http://server2.home',
                server3: 'http://server3.home',
                update: 'http://update.home',
                peraturan: 'http://peraturan.home',
                klasemen: 'http://klasemen.home',
                promosi: 'http://promosi.home',
                livescore: 'http://livescore.home',
                livechat: 'http://livechat.home',
                whatsapp1: 'http://whatsapp1.home',
                whatsapp2: 'http://whatsapp2.home',
                facebook: 'http://facebook.home',
                telegram: 'http://telegram.home',
                instagram: 'http://instagram.home',
                prediksi: 'http://prediksi.home',
            },
            events: [
                {
                    icongif: 'http://icongif.home#',
                    posisi: '1',
                    switchs: true,
                    bannerurl: 'http://update.home',
                    linkevent: 'http://peraturan.home'
                },
                {
                    icongif: 'http://icongif.home2',
                    posisi: '1',
                    switchs: true,
                    bannerurl: 'http://update.home2',
                    linkevent: 'http://peraturan.home2'
                }
            ],
            notice: [
                { title: 'fake title', content: 'ini ada content pemberitahuan' },
                { title: 'fake title2', content: 'ini ada content pemberitahuan2' }
            ],
            created_at: '2024-02-24T15:25:51.326Z',
            updated_at: '2024-02-24T15:25:51.326Z'
        };

        const resultmocksettingss = {
            apkid: 'apk123',
            version: '1.0.1',
            home: 'http://home.home',
            deposit: 'http://deposit.home',
            server1: 'http://server1.home',
            server2: 'http://server2.home',
            server3: 'http://server3.home',
            update: 'http://update.home',
            peraturan: 'http://peraturan.home',
            klasemen: 'http://klasemen.home',
            promosi: 'http://promosi.home',
            livescore: 'http://livescore.home',
            livechat: 'http://livechat.home',
            whatsapp1: 'http://whatsapp1.home',
            whatsapp2: 'http://whatsapp2.home',
            facebook: 'http://facebook.home',
            telegram: 'http://telegram.home',
            instagram: 'http://instagram.home',
            prediksi: 'http://prediksi.home',
            created_at: '2024-02-24T15:25:51.326Z',
            updated_at: '2024-02-24T15:25:51.326Z'
        }


        const resultmockevent = {
            '0': {
                icongif: 'http://icongif.home#',
                posisi: '1',
                switchs: true,
                bannerurl: 'http://update.home',
                linkevent: 'http://peraturan.home'
            },
            '1': {
                icongif: 'http://icongif.home2',
                posisi: '1',
                switchs: true,
                bannerurl: 'http://update.home2',
                linkevent: 'http://peraturan.home2'
            }
        }



        const resultmocknotice = [
            { title: 'fake title', content: 'ini ada content pemberitahuan' },
            { title: 'fake title2', content: 'ini ada content pemberitahuan2' }
        ]

        const mockcacheService = new CacheService();
        mockcacheService.get = jest.fn().mockRejectedValue(new Error('Cache tidak ditemukan'));
        mockcacheService.delete = jest.fn().mockResolvedValue();
        mockcacheService.set = jest.fn().mockResolvedValue();

        const apkRepository = {
            getapkdata: jest.fn().mockResolvedValue(resultmocksettingss),
            getapkevent: jest.fn().mockResolvedValue(resultmockevent),
            getapknotice: jest.fn().mockResolvedValue(resultmocknotice)
        };

        const getDataApkUseCase = new GetDataApkUseCase({
            apkRepository,
            cacheServices: mockcacheService
        });

        const dataapkusecase = await getDataApkUseCase.execute(params);

        expect(mockcacheService.get).toBeCalledWith(`apkid:${params.apkid}`);
        expect(apkRepository.getapkdata).toBeCalledWith(params.apkid);
        expect(apkRepository.getapkevent).toBeCalledWith(params.apkid);
        expect(apkRepository.getapknotice).toBeCalledWith(params.apkid);
        expect(mockcacheService.delete).toBeCalledWith(`apkid:${params.apkid}`);
        expect(mockcacheService.set).toBeCalledWith(`apkid:${params.apkid}`, JSON.stringify(resultmocksettings));
        expect(dataapkusecase).toEqual({
            data: resultmocksettings
        });
    });
});
