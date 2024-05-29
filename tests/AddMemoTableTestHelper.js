/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const AddMemoTableTestHelper = {
  async addmemo({
    idmemo = 1,
    statustype = 1,
    statuspriority = 10,
    subject = 'ini contoh subject 50 character',
    memo = 'ini contoh memo unlimited length character ini contoh memo unlimited length characterini contoh memo unlimited length character',
    created_at = '2024-02-24T15:25:51.326Z'

  }) {
    const query = {
      text: 'INSERT INTO memodata  (idmemo,statustype, statuspriority,subject,memo,created_at) VALUES($1, $2 , $3, $4, $5,$6)',
      values: [idmemo, statustype, statuspriority, subject, memo, created_at],
    };

    await pool.query(query);
  },

  async findmemo(idmemo) {
    const query = {
      text: 'SELECT * FROM memodata WHERE idmemo = $1',
      values: [idmemo],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM memodata WHERE 1=1');
  },
};

module.exports = AddMemoTableTestHelper;
