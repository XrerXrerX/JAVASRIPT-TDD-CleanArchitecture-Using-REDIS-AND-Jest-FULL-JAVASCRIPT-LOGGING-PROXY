/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const UsersReffsTableTestHelper = {
  async addReffUser({
    reffs_id = 'idrf123', xyuseridxy = 'user123'
  }) {
    const query = {
      text: 'INSERT INTO reffs VALUES($1, $2)',
      values: [reffs_id, xyuseridxy],
    };

    await pool.query(query);
  },

  async findUsersByIdreffs(id) {
    const query = {
      text: 'SELECT * FROM reffs WHERE xyuseridxy = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM reffs WHERE 1=1');
  },
};

module.exports = UsersReffsTableTestHelper;
