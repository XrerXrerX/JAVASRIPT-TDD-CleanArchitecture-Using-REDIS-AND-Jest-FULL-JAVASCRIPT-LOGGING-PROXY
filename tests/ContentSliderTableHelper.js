/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const ContentSliderTableHelper = {
  async addslider({
    idctsldr = 1,
    ctsldrur = 'https=//example.com/2',
    ttlectsldr = 'example title 2',
    trgturctsldr = 'https=//example.com/2',
    statusctsldr = '2',

  }) {
    const query = {
      text: 'INSERT INTO ctsldr  (idctsldr,ctsldrur, ttlectsldr, trgturctsldr, statusctsldr) VALUES($1, $2, $3, $4, $5)',
      values: [idctsldr, ctsldrur, ttlectsldr, trgturctsldr, statusctsldr],
    };

    await pool.query(query);
  },

  async findslider(id) {
    const query = {
      text: 'SELECT * FROM ctsldr WHERE idctsldr = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM ctsldr WHERE 1=1');
  },
};

module.exports = ContentSliderTableHelper;
