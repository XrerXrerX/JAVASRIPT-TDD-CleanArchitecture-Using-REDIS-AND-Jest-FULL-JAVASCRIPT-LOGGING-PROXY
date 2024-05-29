/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const AddMasterTableTestHelper = {
  async addmaster({
    idbnkmaster = 1,
    bnkmstrxyxyx = 'bca',
    urllogoxxyx = 'https://www.coskoc.com/api/',
    statusxyxyy = 1,
    created_at = '2024-02-24T15:25:51.326Z'
  }) {
    const query = {
      text: 'INSERT INTO masterbank  (idbnkmaster,bnkmstrxyxyx, urllogoxxyx, statusxyxyy, created_at) VALUES($1, $2 , $3, $4, $5)',
      values: [idbnkmaster, bnkmstrxyxyx, urllogoxxyx, statusxyxyy, created_at],
    };

    await pool.query(query);
  },

  async findmster(bnkmstrxyxyx) {
    const query = {
      text: 'SELECT * FROM masterbank WHERE bnkmstrxyxyx = $1',
      values: [bnkmstrxyxyx],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM masterbank WHERE 1=1');
  },
};

module.exports = AddMasterTableTestHelper;
