/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const ContentLinkTableHelper = {
  async addlink({
    idctlnk = 1,
    ctlnkname = 'link alternatif33',
    ctlnkdmn = 'https://example.com/33',
    statusctlnk = '3',

  }) {
    const query = {
      text: 'INSERT INTO ctlnk  (idctlnk,ctlnkname , ctlnkdmn,statusctlnk) VALUES($1, $2, $3, $4)',
      values: [idctlnk, ctlnkname, ctlnkdmn, statusctlnk],
    };

    await pool.query(query);
  },

  async findlink(id) {
    const query = {
      text: 'SELECT * FROM ctlnk WHERE idctlnk = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM ctlnk WHERE 1=1');
  },
};

module.exports = ContentLinkTableHelper;
