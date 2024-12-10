/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const AddApkEventTableTestHelper = {
  async addevent({
    apkid = 'apk123',
    icongif = 'http://icongif.home',
    posisi = '1',
    switchs = true,
    bannerurl = 'http://update.home',
    linkevent = 'http://peraturan.home',
    created_at = '2024-02-24T15:25:51.326Z'
  }) {
    const query = {
      text: 'INSERT INTO dataapkevent  (apkid,icongif, posisi, switchs, bannerurl, linkevent, created_at) VALUES($1, $2, $3, $4, $5, $6,$7)',
      values: [apkid, icongif, posisi, switchs, bannerurl, linkevent, created_at],
    };

    await pool.query(query);
  },

  async findeventbyid(id) {
    const query = {
      text: 'SELECT * FROM dataapkevent WHERE apkid = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM dataapkevent WHERE 1=1');
  },
};

module.exports = AddApkEventTableTestHelper;
