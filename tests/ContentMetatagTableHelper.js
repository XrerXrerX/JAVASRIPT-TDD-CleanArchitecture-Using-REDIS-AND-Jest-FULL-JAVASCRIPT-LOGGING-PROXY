/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const ContentMetatagTableHelper = {
  async addContent({
    iddtmeta = 1,
    mttag = '<h2>welcome</h2>',
    artcl = '<h2>test article</h2>',
    scrptlvc = 'http://deposit.home',
  }) {
    const query = {
      text: 'INSERT INTO datameta  (iddtmeta,mttag, artcl, scrptlvc) VALUES($1, $2, $3, $4)',
      values: [iddtmeta, mttag, artcl, scrptlvc]
    };

    await pool.query(query);
  },

  async findcontent(id) {
    const query = {
      text: 'SELECT * FROM datameta WHERE iddtmeta = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM datameta WHERE 1=1');
  },
};

module.exports = ContentMetatagTableHelper;
