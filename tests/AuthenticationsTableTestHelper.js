/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const AuthenticationsTableTestHelper = {
  async addToken(token) {
    const query = {
      text: 'INSERT INTO authentications VALUES($1)',
      values: [token],
    };

    await pool.query(query);
  },

<<<<<<< HEAD
  async updatetoken(token, oldtoken) {
    const query = {
      text: 'UPDATE authentications SET token = $1 WHERE token = $2',
      values: [token, oldtoken],
    };

    await pool.query(query);
  },

=======
>>>>>>> aaf28ac1629362d7e0c504db6cc6a3a138f07f0b
  async findToken(token) {
    const query = {
      text: 'SELECT token FROM authentications WHERE token = $1',
      values: [token],
    };

    const result = await pool.query(query);

    return result.rows;
  },
  async cleanTable() {
    await pool.query('DELETE FROM authentications WHERE 1=1');
  },
};

module.exports = AuthenticationsTableTestHelper;
