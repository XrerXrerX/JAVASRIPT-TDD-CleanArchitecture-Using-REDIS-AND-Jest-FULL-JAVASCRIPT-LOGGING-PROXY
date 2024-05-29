/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const UsersEventTableTestHelper = {
  async addEventUser({
    eventid = 'idlog123', xyuseridxy = 'user123'
  }) {
    const query = {
      text: 'INSERT INTO events VALUES($1, $2)',
      values: [eventid, xyuseridxy],
    };

    await pool.query(query);
  },


  async findUsersByIdevent(id) {
    const query = {
      text: 'SELECT * FROM events WHERE xyuseridxy = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM events WHERE 1=1');
  },
};

module.exports = UsersEventTableTestHelper;
