/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const AddBanksTableTestHelper = {
  async addbks({
    idbank = 1,
    namegroupxyzt = ['groupbank1'],
    namebankxxyy = 'bca1',
    masterbnkxyxt = 'bca',
    yyxxmethod = 'bank',
    xynamarekx = 'florensia sitangg',
    norekxyxy = '0355917811',
    barcodexrxr = '0',
    zwzwshowbarcode = false,
    created_at = '2024-02-24T15:25:51.326Z'
  }) {
    const query = {
      text: 'INSERT INTO databnk  (idbank,namegroupxyzt, namebankxxyy, masterbnkxyxt, yyxxmethod, xynamarekx, norekxyxy , barcodexrxr , zwzwshowbarcode , created_at) VALUES($1, $2, $3, $4, $5, $6,$7 , $8, $9, $10)',
      values: [idbank, namegroupxyzt, namebankxxyy, masterbnkxyxt, yyxxmethod, xynamarekx, norekxyxy, barcodexrxr, zwzwshowbarcode, created_at],
    };

    await pool.query(query);
  },

  async findbanks(namebankxxyy, xynamarekx, norekxyxy) {
    const query = {
      text: 'SELECT * FROM databnk WHERE namebankxxyy = $1 AND xynamarekx = $2 AND norekxyxy = $3',
      values: [namebankxxyy, xynamarekx, norekxyxy],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM databnk WHERE 1=1');
  },
};

module.exports = AddBanksTableTestHelper;
