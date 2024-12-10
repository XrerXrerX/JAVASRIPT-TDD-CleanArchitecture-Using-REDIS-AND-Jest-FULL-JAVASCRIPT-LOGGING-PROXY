const InvariantError = require('../../Commons/exceptions/InvariantError');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const ApkRepository = require('../../Domains/apks/ApkRepository');



class ApkDataRepositoryPostgres extends ApkRepository {
    constructor(pool, idGenerator) {
        super();
        this._pool = pool;
        this._idGenerator = idGenerator;

    }

    async datasettings(dataapks) {
        const { version, home, deposit, server1, server2, server3, update, peraturan, klasemen, promosi, livescore, livechat, whatsapp1, whatsapp2, facebook, telegram, instagram, prediksi } = dataapks;
        const apkid = `apk${this._idGenerator()}`;


        const created_at = new Date().toISOString();
        const query = {
            text: 'INSERT INTO dataapksettings (apkid ,version, home, deposit, server1, server2, server3, update, peraturan, klasemen, promosi, livescore, livechat, whatsapp1, whatsapp2, facebook, telegram, instagram, prediksi, created_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8 , $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19 , $20) RETURNING apkid',
            values: [apkid, version, home, deposit, server1, server2, server3, update, peraturan, klasemen, promosi, livescore, livechat, whatsapp1, whatsapp2, facebook, telegram, instagram, prediksi, created_at],
        };
        const data = await this._pool.query(query);
        return data.rows[0].apkid;
    }

    async events(dataapks) {
        const { apkid, icongif, posisi, switchs, bannerurl, linkevent } = dataapks;
        const created_at = new Date().toISOString();
        const query = {
            text: 'INSERT INTO dataapkevent (apkid,icongif, posisi, switchs, bannerurl, linkevent, created_at) VALUES($1, $2, $3, $4, $5, $6,$7) RETURNING apkid',
            values: [apkid, icongif, posisi, switchs, bannerurl, linkevent, created_at],
        };

        const data = await this._pool.query(query);
        return data.rows[0].apkid;

    }

    async pemberitahuans(dataapks) {
        const { apkid, title, content } = dataapks;
        const created_at = new Date().toISOString();
        const query = {
            text: 'INSERT INTO dataapknotice (apkid,title, content, created_at) VALUES($1, $2, $3,$4) RETURNING apkid',
            values: [apkid, title, content, created_at],
        };
        const data = await this._pool.query(query);
        return data.rows[0].apkid;
    }

    async getapkdata(apkid) {
        // Kueri untuk mencari dataapknotice
        const noticeQuery = {
            text: 'SELECT * FROM dataapksettings WHERE apkid = $1',
            values: [apkid],
        };
        const noticeData = await this._pool.query(noticeQuery);
        if (!noticeData.rowCount) {
            throw new NotFoundError('data not found !');
        }
        return noticeData.rows[0];
    }


    async getapkevent(apkid) {
        // Kueri untuk mencari dataapknotice
        const eventQuery = {
            text: 'SELECT * FROM dataapkevent WHERE apkid = $1',
            values: [apkid],
        };
        const eventData = await this._pool.query(eventQuery);
        if (!eventData.rowCount) {
            throw new NotFoundError('data not found !');
        }
        return eventData.rows;

    }

    async getapknotice(apkid) {
        // Kueri untuk mencari dataapknotice
        const settingsQuery = {
            text: 'SELECT title, content FROM dataapknotice WHERE apkid = $1',
            values: [apkid],
        };
        const settingsData = await this._pool.query(settingsQuery);
        if (!settingsData.rowCount) {
            throw new NotFoundError('data not found !');
        }
        return settingsData.rows;

    }

}

module.exports = ApkDataRepositoryPostgres;