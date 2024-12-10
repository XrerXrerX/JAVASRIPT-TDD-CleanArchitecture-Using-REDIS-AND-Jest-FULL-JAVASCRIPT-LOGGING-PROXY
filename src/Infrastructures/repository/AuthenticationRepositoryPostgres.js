const InvariantError = require('../../Commons/exceptions/InvariantError');
const AuthenticationRepository = require('../../Domains/authentications/AuthenticationRepository');

class AuthenticationRepositoryPostgres extends AuthenticationRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async addToken(token) {
    // try {
    const query = {
      text: 'INSERT INTO authentications VALUES ($1)',
      values: [token],
    };
    await this._pool.query(query);
    // } catch (err) {
    //   console.error(err.message);

    // }
  }

  async updatetoken(token, oldtoken) {
    // try {
    const query = {
      text: 'UPDATE authentications SET token = $1 WHERE token = $2',
      values: [token, oldtoken],
    };
    await this._pool.query(query);
    // } catch (err) {
    //   console.error(err.message);

    // }
  }

  async checkAvailabilityToken(token) {
    const query = {
      text: 'SELECT * FROM authentications WHERE token = $1',
      values: [token],
    };

    const result = await this._pool.query(query);

    if (result.rows.length === 0) {
      throw new InvariantError('refresh token tidak ditemukan di database');
    }
  }

  async deleteToken(token) {
    const query = {
      text: 'DELETE FROM authentications WHERE token = $1',
      values: [token],
    };

    await this._pool.query(query);
  }
}

module.exports = AuthenticationRepositoryPostgres;
