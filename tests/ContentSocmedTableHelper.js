/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const ContentSocmedTableHelper = {
  async addsocmed({
    idctscmed = 1,
    ctscmedur = 'https://example.com/3',
    nmectscmed = 'example title 2',
    trgturctscmed = 'https://example.com',
    lvchturctscmed = 'https://example.com',
    fdbckurctscmed = 'https://example.com',
    statusctscmed = '1',

  }) {
    const query = {
      text: 'INSERT INTO ctscmed  (idctscmed,ctscmedur, nmectscmed, trgturctscmed, statusctscmed ,lvchturctscmed,fdbckurctscmed) VALUES($1, $2, $3, $4, $5,$6,$7)',
      values: [idctscmed, ctscmedur, nmectscmed, trgturctscmed, statusctscmed, lvchturctscmed, fdbckurctscmed],
    };

    await pool.query(query);
  },

  async findsocmed(id) {
    const query = {
      text: 'SELECT * FROM ctscmed WHERE idctscmed = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM ctscmed WHERE 1=1');
  },
};

module.exports = ContentSocmedTableHelper;
