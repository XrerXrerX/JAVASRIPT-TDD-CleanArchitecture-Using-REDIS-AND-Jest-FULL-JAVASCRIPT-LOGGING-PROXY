/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const ContentgeneralContentTableHelper = {
  async addgeneralct({
    idnmwebst = 1,
    nmwebsite = 'nama website2',
    logrl = 'global-bola-logo.webp2',
    icrl = 'global-bola-logo.webp2',
    pkrl = 'https://apkdownload.com/2',
    rnntxt = 'GLOBALBOLA SITUS RESMI22 | Situs Betting Parlay Terlengkap & Terpercaya | proses transaksi kurang dari 1 menit',

  }) {
    const query = {
      text: 'INSERT INTO ctgeneral  (idnmwebst,nmwebsite , logrl, icrl, pkrl, rnntxt) VALUES($1, $2, $3, $4, $5, $6)',
      values: [idnmwebst, nmwebsite, logrl, icrl, pkrl, rnntxt],
    };

    await pool.query(query);
  },

  async findctgeneral(id) {
    const query = {
      text: 'SELECT * FROM ctgeneral WHERE idnmwebst = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM ctgeneral WHERE 1=1');
  },
};

module.exports = ContentgeneralContentTableHelper;
