const GetDataApk = require('../GetDataApk.js');


describe('entities for APK get data', () => {

    it('should send an error when not contain fill in data spesification', () => {
        //arrange

        const payload = {

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
            icongif: 'http://icongif.home#',
            posisi: '1',
            switchs: true,
            bannerurl: 'http://update.home',
            linkevent: 'http://peraturan.home',
            title: 'fake title',
            content: 'ini ada content pemberitahuan',
            created_at: '2024-02-24T15:25:51.326Z',
            updated_at: '2024-02-24T15:25:51.326Z'
        };


        expect(() => new GetDataApk(payload)).toThrowError('GET_DATA.NOT_CONTAIN_NEEDED_PROPERTY');
    });


    it('should add Apk data Correctly', () => {
        //arrange
        const payload = {
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
            icongif: 'http://icongif.home#',
            posisi: '1',
            switchs: true,
            bannerurl: 'http://update.home',
            linkevent: 'http://peraturan.home',
            title: 'fake title',
            content: 'ini ada content pemberitahuan',
            created_at: '2024-02-24T15:25:51.326Z',
            updated_at: '2024-02-24T15:25:51.326Z'
        };

        const { apkid, version, home, deposit, server1, server2, server3, update, peraturan, klasemen, promosi, livescore, livechat, whatsapp1, whatsapp2, facebook, telegram, instagram, prediksi, icongif, posisi, bannerurl, linkevent, switchs, title, content, created_at, updated_at } = new GetDataApk(payload);

        // Assert
        expect(apkid).toEqual(payload.apkid);
        expect(version).toEqual(payload.version);
        expect(home).toEqual(payload.home);
        expect(deposit).toEqual(payload.deposit);
        expect(server1).toEqual(payload.server1);
        expect(server2).toEqual(payload.server2);
        expect(server3).toEqual(payload.server3);
        expect(update).toEqual(payload.update);
        expect(peraturan).toEqual(payload.peraturan);
        expect(klasemen).toEqual(payload.klasemen);
        expect(promosi).toEqual(payload.promosi);
        expect(livescore).toEqual(payload.livescore);
        expect(livechat).toEqual(payload.livechat);
        expect(whatsapp1).toEqual(payload.whatsapp1);
        expect(whatsapp2).toEqual(payload.whatsapp2);
        expect(facebook).toEqual(payload.facebook);
        expect(telegram).toEqual(payload.telegram);
        expect(instagram).toEqual(payload.instagram);
        expect(prediksi).toEqual(payload.prediksi);
        expect(icongif).toEqual(payload.icongif);
        expect(posisi).toEqual(payload.posisi);
        expect(bannerurl).toEqual(payload.bannerurl);
        expect(linkevent).toEqual(payload.linkevent);
        expect(switchs).toEqual(payload.switchs);
        expect(title).toEqual(payload.title);
        expect(content).toEqual(payload.content);
        expect(created_at).toEqual(payload.created_at);
        expect(updated_at).toEqual(payload.updated_at);
    });
});