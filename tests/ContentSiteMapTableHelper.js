/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const ContentSiteMapTableHelper = {
  async addsitemap({
    idstmp = 1,
    urpage = 'index',
    created_at = '2024-05-25T15:25:51.326Z',
    updated_at = '2024-05-25'

  }) {
    const query = {
      text: 'INSERT INTO stmp  (idstmp,urpage , created_at, updated_at) VALUES($1, $2, $3, $4)',
      values: [idstmp, urpage, created_at, updated_at]
    };

    await pool.query(query);
  },

  async findsitemap(urpage) {
    const query = {
      text: 'SELECT * FROM stmp WHERE urpage = $1',
      values: [urpage],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM stmp WHERE 1=1');
  },
};

module.exports = ContentSiteMapTableHelper;
