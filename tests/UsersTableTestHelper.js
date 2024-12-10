/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const UsersTableTestHelper = {
  async addUser({
    xyuseridxy = 'user123', xyusernamexxy = 'fakeuser', xybanknamexyy = 'abc', xybankuserxy = 'fake name', xxybanknumberxy = '12345678', xyx11xuser_mailxxyy = 'user@gmail.com', xynumbphonexyyy = '58469874451', created_at = '2024-02-24T15:25:51.326Z,'
  }) {
    const query = {
      text: 'INSERT INTO users (xyuseridxy, xyusernamexxy, xybanknamexyy, xybankuserxy, xxybanknumberxy, xyx11xuser_mailxxyy, xynumbphonexyyy, created_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8 )',
      values: [xyuseridxy, xyusernamexxy, xybanknamexyy, xybankuserxy, xxybanknumberxy, xyx11xuser_mailxxyy, xynumbphonexyyy, created_at],
    };

    await pool.query(query);
  },

  async findUsersById(id) {
    const query = {
      text: 'SELECT * FROM users WHERE xyuseridxy = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM users WHERE 1=1');
  },
};

module.exports = UsersTableTestHelper;
