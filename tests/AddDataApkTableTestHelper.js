/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const AddDataApkTableTestHelper = {
  async addapk({ apkid = 'apk123', version = '1.0.1', home = 'http://home.home', deposit = 'http://deposit.home', server1 = 'http://server1.home', server2 = 'http://server2.home', server3 = 'http://server3.home', update = 'http://update.home', peraturan = 'http://peraturan.home', klasemen = 'http://klasemen.home', promosi = 'http://promosi.home', livescore = 'http://livescore.home', livechat = 'http://livechat.home', whatsapp1 = 'http://whatsapp1.home', whatsapp2 = 'http://whatsapp2.home', facebook = 'http://facebook.home', telegram = 'http://telegram.home', instagram = 'http://instagram.home', prediksi = 'http://prediksi.home', created_at = '2024-02-24T15:25:51.326Z' }) {
    const query = {
      text: 'INSERT INTO dataapksettings (apkid ,version, home, deposit, server1, server2, server3, update, peraturan, klasemen, promosi, livescore, livechat, whatsapp1, whatsapp2, facebook, telegram, instagram, prediksi, created_at)  VALUES($1, $2, $3, $4, $5, $6, $7, $8 , $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19 ,$20)',
      values: [apkid, version, home, deposit, server1, server2, server3, update, peraturan, klasemen, promosi, livescore, livechat, whatsapp1, whatsapp2, facebook, telegram, instagram, prediksi, created_at],
    };

    await pool.query(query);
  },

  async findVersion(id) {
    const query = {
      text: 'SELECT * FROM dataapksettings WHERE version = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM dataapksettings WHERE 1=1');
  },
};

module.exports = AddDataApkTableTestHelper;
