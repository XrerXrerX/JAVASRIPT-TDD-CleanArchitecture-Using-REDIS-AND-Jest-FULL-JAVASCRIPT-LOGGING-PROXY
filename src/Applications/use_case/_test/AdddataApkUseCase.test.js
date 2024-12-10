const AddApk = require('../../../Domains/apks/entities/AddApk');
const AddeventApk = require('../../../Domains/apks/entities/AddeventApk');
const AddPemberitahuanApk = require('../../../Domains/apks/entities/AddPemberitahuanApk');
const ApkRepository = require('../../../Domains/apks/ApkRepository');
const AdddataApkUseCase = require('../AdddataApkUseCase');
const CacheService = require('../../../Applications/caching/CacheService');




describe('APK DATA RESERVER API POST GET DATA', () => {
    /**
     * membuat usecase untuk data apk 
     */

    it('should orchestrating add data apk get correctly', async () => {
        //arrange
        const useCasePayload = {
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
            // icongif: 'http://icongif.home',
            // posisi: '1',
            // switchs: true,
            // bannerurl: 'http://update.home',
            // linkevent: 'http://peraturan.home',
            // title: 'fake title',
            // content: 'ini ada content pemberitahuanontent',
        };

        const apkid = 'apk123';

        const mockAddDataSettings = new AddApk({
            version: useCasePayload.version,
            home: useCasePayload.home,
            deposit: useCasePayload.deposit,
            server1: useCasePayload.server1,
            server2: useCasePayload.server2,
            server3: useCasePayload.server3,
            update: useCasePayload.update,
            peraturan: useCasePayload.peraturan,
            klasemen: useCasePayload.klasemen,
            promosi: useCasePayload.promosi,
            livescore: useCasePayload.livescore,
            livechat: useCasePayload.livechat,
            whatsapp1: useCasePayload.whatsapp1,
            whatsapp2: useCasePayload.whatsapp2,
            facebook: useCasePayload.facebook,
            telegram: useCasePayload.telegram,
            instagram: useCasePayload.instagram,
            prediksi: useCasePayload.prediksi
        });

        // const mockAddDataevent = new AddeventApk({
        //     icongif: useCasePayload.icongif,
        //     posisi: useCasePayload.posisi,
        //     switchs: useCasePayload.switchs,
        //     bannerurl: useCasePayload.bannerurl,
        //     linkevent: useCasePayload.linkevent,
        // });

        // const mockAddDatapemberitahuans = new AddPemberitahuanApk({
        //     title: useCasePayload.title,
        //     content: useCasePayload.content,
        // });

        /** creating dependency of use case */
        const mockcacheService = new CacheService();
        const mockapkRepository = new ApkRepository();

        /** mocking needed function */


        mockapkRepository.datasettings = jest.fn()
            .mockImplementation(() => Promise.resolve(apkid));
        mockcacheService.delete = jest.fn().mockResolvedValue();

        // mockapkRepository.events = jest.fn()
        //     .mockImplementation(() => Promise.resolve());
        // mockapkRepository.pemberitahuans = jest.fn()
        //     .mockImplementation(() => Promise.resolve());


        const getDataUseCase = new AdddataApkUseCase({
            apkRepository: mockapkRepository,
            cacheServices: mockcacheService

        });

        const dataapkusecase = await getDataUseCase.execute(useCasePayload);

        expect(dataapkusecase).toStrictEqual(apkid);
        expect(mockapkRepository.datasettings).toBeCalledWith(mockAddDataSettings);


        expect(mockcacheService.delete).toBeCalledWith(`apkid:${apkid}`);




        // expect(mockapkRepository.events).toBeCalledWith(mockAddDataevent, apkid);
        // expect(mockapkRepository.pemberitahuans).toBeCalledWith(mockAddDatapemberitahuans, apkid);
    });

    it('should orchestrating add data apk event correctly', async () => {
        //arrange
        const useCasePayload = {
            // version: '1.0.1',
            // home: 'http://home.home',
            // deposit: 'http://deposit.home',
            // server1: 'http://server1.home',
            // server2: 'http://server2.home',
            // server3: 'http://server3.home',
            // update: 'http://update.home',
            // peraturan: 'http://peraturan.home',
            // klasemen: 'http://klasemen.home',
            // promosi: 'http://promosi.home',
            // livescore: 'http://livescore.home',
            // livechat: 'http://livechat.home',
            // whatsapp1: 'http://whatsapp1.home',
            // whatsapp2: 'http://whatsapp2.home',
            // facebook: 'http://facebook.home',
            // telegram: 'http://telegram.home',
            // instagram: 'http://instagram.home',
            // prediksi: 'http://prediksi.home',
            apkid: 'apk123',
            icongif: 'http://icongif.home',
            posisi: '1',
            switchs: true,
            bannerurl: 'http://update.home',
            linkevent: 'http://peraturan.home',
            // title: 'fake title',
            // content: 'ini ada content pemberitahuanontent',
        };

        const apkid = 'apk123';

        // const mockAddDataSettings = new AddApk({
        //     version: useCasePayload.version,
        //     home: useCasePayload.home,
        //     deposit: useCasePayload.deposit,
        //     server1: useCasePayload.server1,
        //     server2: useCasePayload.server2,
        //     server3: useCasePayload.server3,
        //     update: useCasePayload.update,
        //     peraturan: useCasePayload.peraturan,
        //     klasemen: useCasePayload.klasemen,
        //     promosi: useCasePayload.promosi,
        //     livescore: useCasePayload.livescore,
        //     livechat: useCasePayload.livechat,
        //     whatsapp1: useCasePayload.whatsapp1,
        //     whatsapp2: useCasePayload.whatsapp2,
        //     facebook: useCasePayload.facebook,
        //     telegram: useCasePayload.telegram,
        //     instagram: useCasePayload.instagram,
        //     prediksi: useCasePayload.prediksi
        // });

        const mockAddDataevent = new AddeventApk({
            apkid: useCasePayload.apkid,
            icongif: useCasePayload.icongif,
            posisi: useCasePayload.posisi,
            switchs: useCasePayload.switchs,
            bannerurl: useCasePayload.bannerurl,
            linkevent: useCasePayload.linkevent,
        });

        // const mockAddDatapemberitahuans = new AddPemberitahuanApk({
        //     title: useCasePayload.title,
        //     content: useCasePayload.content,
        // });

        /** creating dependency of use case */
        const mockapkRepository = new ApkRepository();
        const mockcacheService = new CacheService();


        /** mocking needed function */
        // mockapkRepository.datasettings = jest.fn()
        //     .mockImplementation(() => Promise.resolve(apkid));
        mockapkRepository.events = jest.fn()
            .mockImplementation(() => Promise.resolve(apkid));
        mockcacheService.delete = jest.fn().mockResolvedValue();

        // mockapkRepository.pemberitahuans = jest.fn()
        //     .mockImplementation(() => Promise.resolve());


        const getDataUseCase = new AdddataApkUseCase({
            apkRepository: mockapkRepository,
            cacheServices: mockcacheService
        });

        const dataapkusecase = await getDataUseCase.executeevent(useCasePayload);

        expect(dataapkusecase).toStrictEqual(apkid);
        // expect(mockapkRepository.datasettings).toBeCalledWith(mockAddDataSettings);
        expect(mockapkRepository.events).toBeCalledWith(mockAddDataevent);
        expect(mockcacheService.delete).toBeCalledWith(`apkid:${{ apkid }}`);

        // expect(mockapkRepository.pemberitahuans).toBeCalledWith(mockAddDatapemberitahuans, apkid);
    });



    it('should orchestrating add data notice correctly', async () => {
        //arrange
        const useCasePayload = {
            // version: '1.0.1',
            // home: 'http://home.home',
            // deposit: 'http://deposit.home',
            // server1: 'http://server1.home',
            // server2: 'http://server2.home',
            // server3: 'http://server3.home',
            // update: 'http://update.home',
            // peraturan: 'http://peraturan.home',
            // klasemen: 'http://klasemen.home',
            // promosi: 'http://promosi.home',
            // livescore: 'http://livescore.home',
            // livechat: 'http://livechat.home',
            // whatsapp1: 'http://whatsapp1.home',
            // whatsapp2: 'http://whatsapp2.home',
            // facebook: 'http://facebook.home',
            // telegram: 'http://telegram.home',
            // instagram: 'http://instagram.home',
            // prediksi: 'http://prediksi.home',
            // icongif: 'http://icongif.home',
            // posisi: '1',
            // switchs: true,
            // bannerurl: 'http://update.home',
            // linkevent: 'http://peraturan.home',
            apkid: 'apk123',
            title: 'fake title',
            content: 'ini ada content pemberitahuanontent',
        };

        const apkid = 'apk123';

        // const mockAddDataSettings = new AddApk({
        //     version: useCasePayload.version,
        //     home: useCasePayload.home,
        //     deposit: useCasePayload.deposit,
        //     server1: useCasePayload.server1,
        //     server2: useCasePayload.server2,
        //     server3: useCasePayload.server3,
        //     update: useCasePayload.update,
        //     peraturan: useCasePayload.peraturan,
        //     klasemen: useCasePayload.klasemen,
        //     promosi: useCasePayload.promosi,
        //     livescore: useCasePayload.livescore,
        //     livechat: useCasePayload.livechat,
        //     whatsapp1: useCasePayload.whatsapp1,
        //     whatsapp2: useCasePayload.whatsapp2,
        //     facebook: useCasePayload.facebook,
        //     telegram: useCasePayload.telegram,
        //     instagram: useCasePayload.instagram,
        //     prediksi: useCasePayload.prediksi
        // });

        // const mockAddDataevent = new AddeventApk({
        //     icongif: useCasePayload.icongif,
        //     posisi: useCasePayload.posisi,
        //     switchs: useCasePayload.switchs,
        //     bannerurl: useCasePayload.bannerurl,
        //     linkevent: useCasePayload.linkevent,
        // });

        const mockAddDatapemberitahuans = new AddPemberitahuanApk({
            apkid: useCasePayload.apkid,
            title: useCasePayload.title,
            content: useCasePayload.content,
        });

        /** creating dependency of use case */
        const mockapkRepository = new ApkRepository();
        const mockcacheService = new CacheService();


        /** mocking needed function */
        // mockapkRepository.datasettings = jest.fn()
        //     .mockImplementation(() => Promise.resolve(apkid));
        // mockapkRepository.events = jest.fn()
        //     .mockImplementation(() => Promise.resolve());
        mockapkRepository.pemberitahuans = jest.fn()
            .mockImplementation(() => Promise.resolve(apkid));
        mockcacheService.delete = jest.fn().mockResolvedValue();


        const getDataUseCase = new AdddataApkUseCase({
            apkRepository: mockapkRepository,
            cacheServices: mockcacheService
        });

        const dataapkusecase = await getDataUseCase.executenotice(useCasePayload);
        expect(dataapkusecase).toStrictEqual(apkid);
        // expect(mockapkRepository.datasettings).toBeCalledWith(mockAddDataSettings);
        // expect(mockapkRepository.events).toBeCalledWith(mockAddDataevent, apkid);
        expect(mockapkRepository.pemberitahuans).toBeCalledWith(mockAddDatapemberitahuans);

        expect(mockcacheService.delete).toBeCalledWith(`apkid:${apkid}`);

    });


});