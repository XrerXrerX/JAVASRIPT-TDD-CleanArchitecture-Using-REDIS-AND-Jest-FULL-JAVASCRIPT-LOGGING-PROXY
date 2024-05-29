const AddApkEventTableTestHelper = require('../../../../tests/AddApkEventTableTestHelper');
const AddApkPemberitahuanTableTestHelper = require('../../../../tests/AddApkPemberitahuanTableTestHelper');
const AddDataApkTableTestHelper = require('../../../../tests/AddDataApkTableTestHelper');
const InvariantError = require('../../../Commons/exceptions/InvariantError');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const AddApk = require('../../../Domains/apks/entities/AddApk');
const AddeventApk = require('../../../Domains/apks/entities/AddeventApk');
const AddPemberitahuanApk = require('../../../Domains/apks/entities/AddPemberitahuanApk');
const pool = require('../../database/postgres/pool');
const ApkDataRepositoryPostgres = require('../ApkDataRepositoryPostgres');
// const CacheServices = require('../../caching/redis/CacheServices');
// const redis = require('redis');


describe('ApkRepositoryPostgres', () => {
  // let cacheService;

  // beforeEach(() => {
  //     // Membuat instance CacheService sebelum setiap tes
  //     cacheService = new CacheServices();
  // });

  // afterEach(async () => {
  //     // Membersihkan cache setelah setiap tes
  //     await cacheService.delete('testKey');
  // });
  afterEach(async () => {
    await AddApkEventTableTestHelper.cleanTable();
    await AddApkPemberitahuanTableTestHelper.cleanTable();
    await AddDataApkTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('add data in apk data settings', () => {
    it('should persist add data settings and return success', async () => {
      //arrange
      const addApk = new AddApk({
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
      });
      const fakeIdGenerator = () => '123'; // stub!

      const apkDataRepositoryPostgres = new ApkDataRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      await apkDataRepositoryPostgres.datasettings(addApk);
      // Assert
      const datasettings = await AddDataApkTableTestHelper.findVersion('1.0.1');
      expect(datasettings).toHaveLength(1);
    });

    it('should return 201 add apk correctly', async () => {
      //arrange
      const addApk = new AddApk({
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
      });
      const fakeIdGenerator = () => '123'; // stub!

      const apkDataRepositoryPostgres = new ApkDataRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      const data = await apkDataRepositoryPostgres.datasettings(addApk);
      // Assert
      expect(data).toStrictEqual('apk123');
    });



    it('should persist add event apk data and success', async () => {
      const addeventApk = new AddeventApk({
        apkid: 'apk123',
        icongif: 'http://icongif.home',
        posisi: '1',
        switchs: true,
        bannerurl: 'http://update.home',
        linkevent: 'http://peraturan.home',
      });
      const apkDataRepositoryPostgres = new ApkDataRepositoryPostgres(pool);

      // Action
      const idevent = await apkDataRepositoryPostgres.events(addeventApk);
      // Assert
      const dataevent = await AddApkEventTableTestHelper.findeventbyid(idevent);
      expect(dataevent).toHaveLength(1);

    });

    it('should persist add pemberitahuan apk data and success', async () => {
      const addPemberitahuanApk = new AddPemberitahuanApk({
        apkid: 'apk123',
        title: 'fake title',
        content: 'ini ada content pemberitahuan',
      });
      const apkDataRepositoryPostgres = new ApkDataRepositoryPostgres(pool);

      // Action
      const idnotice = await apkDataRepositoryPostgres.pemberitahuans(addPemberitahuanApk);
      // Assert
      const dataevent = await AddApkPemberitahuanTableTestHelper.findnoticebyid(idnotice);
      expect(dataevent).toHaveLength(1);

    });
  });

  describe('get Data Apk', () => {

    it('should throw NotFoundError when data bank not found', async () => {
      // Arrange
      const params = {
        apkid: 'apk1234555'
      }
      const apkDataRepository = new ApkDataRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(apkDataRepository.getapkdata(params.apkid))
        .rejects
        .toThrowError(NotFoundError);
      await expect(apkDataRepository.getapknotice(params.apkid))
        .rejects
        .toThrowError(NotFoundError);
      await expect(apkDataRepository.getapkevent(params.apkid))
        .rejects
        .toThrowError(NotFoundError);
    });


    it('should get Data apk data and success', async () => {
      const params = {
        apkid: 'apk1234'
      }
      await AddDataApkTableTestHelper.addapk({ apkid: 'apk1234', created_at: '2024-02-24T15:25:51.326Z' });
      await AddApkEventTableTestHelper.addevent({ apkid: 'apk1234', created_at: '2024-02-24T15:25:51.326Z' });
      await AddApkEventTableTestHelper.addevent({ apkid: 'apk1234', created_at: '2024-02-24T15:25:51.326Z' });
      await AddApkPemberitahuanTableTestHelper.addnotice({ apkid: 'apk1234', created_at: '2024-02-24T15:25:51.326Z' });
      await AddApkPemberitahuanTableTestHelper.addnotice({ apkid: 'apk1234', created_at: '2024-02-24T15:25:51.326Z' });

      const apkDataRepository = new ApkDataRepositoryPostgres(pool, {});

      const { idapk, created_at, updated_at, ...getDataApk } = await apkDataRepository.getapkdata(params.apkid);
      const getNotice = await apkDataRepository.getapknotice(params.apkid);
      const { apkid, ...getEvent } = await apkDataRepository.getapkevent(params.apkid);

      const events = [];
      for (const key in getEvent) {
        const { apkid, idapk, idevent, ...eventData } = getEvent[key];
        events.push({
          ...eventData
        });
      }

      const notice = [];
      for (const key in getNotice) {
        notice.push({
          ...getNotice[key]
        });
      }

      const mergedData = {
        masterdata: {
          ...getDataApk
        },
        events: events,
        notice: notice,
        created_at,
        updated_at
      };

      expect(mergedData).toStrictEqual({
        masterdata: {
          apkid: 'apk1234',
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
          prediksi: 'http://prediksi.home'
        },
        events: [
          {
            icongif: 'http://icongif.home',
            posisi: '1',
            switchs: true,
            bannerurl: 'http://update.home',
            linkevent: 'http://peraturan.home',
            created_at: '2024-02-24T15:25:51.326Z',
            updated_at: null
          },
          {
            icongif: 'http://icongif.home',
            posisi: '1',
            switchs: true,
            bannerurl: 'http://update.home',
            linkevent: 'http://peraturan.home',
            created_at: '2024-02-24T15:25:51.326Z',
            updated_at: null
          }
        ],
        notice: [
          { title: 'fake title', content: 'ini ada content pemberitahuan' },
          { title: 'fake title', content: 'ini ada content pemberitahuan' }
        ],
        created_at: '2024-02-24T15:25:51.326Z',
        updated_at: null
      });

    });
  });
});


