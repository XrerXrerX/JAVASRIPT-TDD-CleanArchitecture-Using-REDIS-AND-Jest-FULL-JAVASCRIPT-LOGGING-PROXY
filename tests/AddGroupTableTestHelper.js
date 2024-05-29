/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const AddGroupTableTestHelper = {
  async addgroup({
    idgroup = 1,
    groupbank = 'groupbank1',
    grouptype = 1,
    min_dp = 10,
    max_dp = 2500,
    min_wd = 30,
    max_wd = 50000,
  }) {
    const query = {
      text: 'INSERT INTO mastergroup  (idgroup,groupbank, grouptype,min_dp,max_dp,min_wd,max_wd) VALUES($1, $2 , $3, $4, $5, $6, $7)',
      values: [idgroup, groupbank, grouptype, min_dp, max_dp, min_wd, max_wd],
    };

    await pool.query(query);
  },

  async findgrp(namegroupxyzt) {
    const query = {
      text: 'SELECT * FROM mastergroup WHERE groupbank = $1',
      values: [namegroupxyzt],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM mastergroup WHERE 1=1');
  },
};

module.exports = AddGroupTableTestHelper;
