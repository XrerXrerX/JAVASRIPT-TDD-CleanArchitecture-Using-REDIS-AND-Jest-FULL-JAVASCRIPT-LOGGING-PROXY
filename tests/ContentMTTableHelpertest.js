/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const ContentMTTableHelpertest = {
  async admt({
    idctmtncnc = 1,
    stsmtncnc = '3',

  }) {
    const query = {
      text: 'INSERT INTO mtncnc  (idctmtncnc,stsmtncnc) VALUES($1, $2)',
      values: [idctmtncnc, stsmtncnc],
    };

    await pool.query(query);
  },

  async findmt(id) {
    const query = {
      text: 'SELECT * FROM mtncnc WHERE idctmtncnc = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM mtncnc WHERE 1=1');
  },
};

module.exports = ContentMTTableHelpertest;
