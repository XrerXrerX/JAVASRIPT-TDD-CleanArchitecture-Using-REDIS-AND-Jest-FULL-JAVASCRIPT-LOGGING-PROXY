/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const AddBnksTableTestHelper = {
  async addbks({
    idbank = 1,
    namegroupxyzt = 'groupbank1',
    namebankxxyy = 'bca',
    statusxxyy = 1,
    yyxxmethod = 'bank',
    xynamarekx = 'florensia sitangg',
    norekxyxy = '0355917811',
    barcodexrxr = 'https://i.ibb.co/n671yNG/Screenshot-44.png',
    zwzwshowbarcode = 1,
    created_at = '2024-02-24T15:25:51.326Z'
  }) {
    const query = {
      text: 'INSERT INTO datagroupdp  (idbank,namegroupxyzt, namebankxxyy, statusxxyy, yyxxmethod, xynamarekx, norekxyxy , barcodexrxr , zwzwshowbarcode , created_at) VALUES($1, $2, $3, $4, $5, $6,$7 , $8, $9, $10)',
      values: [idbank, namegroupxyzt, namebankxxyy, statusxxyy, yyxxmethod, xynamarekx, norekxyxy, barcodexrxr, zwzwshowbarcode, created_at],
    };

    await pool.query(query);
  },

  async findbks(namegroupxyzt) {
    const query = {
      text: 'SELECT * FROM datagroupdp WHERE namegroupxyzt = $1',
      values: [namegroupxyzt],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM datagroupdp WHERE 1=1');
  },
};

module.exports = AddBnksTableTestHelper;
