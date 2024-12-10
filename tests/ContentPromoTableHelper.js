/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const ContentPromoTableHelper = {
  async addprm({
    idctprm = 1,
    ctprmur = 'https://example.com/3',
    ttlectprm = 'example title 2',
    dskprm = 'example title 2',
    trgturctprm = 'https://example.com',
    pssprm = '1',
    statusctprm = '1',

  }) {
    const query = {
      text: 'INSERT INTO ctprm  (idctprm, ctprmur, ttlectprm,dskprm, trgturctprm, pssprm, statusctprm) VALUES($1, $2, $3, $4, $5, $6, $7)',
      values: [idctprm, ctprmur, ttlectprm, dskprm, trgturctprm, pssprm, statusctprm],
    };

    await pool.query(query);
  },

  async findpromo(ctprmur) {
    const query = {
      text: 'SELECT * FROM ctprm WHERE ctprmur = $1',
      values: [ctprmur],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM ctprm WHERE 1=1');
  },
};

module.exports = ContentPromoTableHelper;
