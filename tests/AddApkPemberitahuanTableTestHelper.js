/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const AddApkPemberitahuanTableTestHelper = {
  async addnotice({
    apkid = 'apk123',
    title = 'fake title',
    content = 'ini ada content pemberitahuan', created_at = '2024-02-24T15:25:51.326Z'
  }) {
    const query = {
      text: 'INSERT INTO dataapknotice  (apkid, title, content, created_at) VALUES($1, $2, $3,$4)',
      values: [apkid, title, content, created_at],
    };

    await pool.query(query);
  },

  async findnoticebyid(id) {
    const query = {
      text: 'SELECT * FROM dataapknotice WHERE apkid = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM dataapknotice WHERE 1=1');
  },
};

module.exports = AddApkPemberitahuanTableTestHelper;
