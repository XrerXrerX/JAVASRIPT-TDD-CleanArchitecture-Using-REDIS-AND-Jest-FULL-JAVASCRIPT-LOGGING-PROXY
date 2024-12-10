const { Client } = require('pg');
const AuthenticationTokenManager = require('../../Applications/security/AuthenticationTokenManager');
const InvariantError = require('../../Commons/exceptions/InvariantError');
const ClientError = require('../../Commons/exceptions/ClientError');




class JwtTokenManager extends AuthenticationTokenManager {
  constructor(jwt) {
    super();
    this._jwt = jwt;
  }

  async createAccessToken(payload) {
    const TKN_AGE = parseInt(process.env.ACCCESS_TOKEN_AGE); // Mengambil nilai dari environment variable atau default 60000 jika tidak ada
    const expiration = Math.floor(Date.now() / 1000) + TKN_AGE + 600; // Menghitung waktu kedaluwarsa
    // return this._jwt.generate(payload, process.env.ACCESS_TOKEN_KEY);
    return this._jwt.generate({ ...payload, exp: expiration }, process.env.ACCESS_TOKEN_KEY);
  }

  async createRefreshToken(payload) {
    const TKN_AGE = parseInt(process.env.ACCCESS_TOKEN_AGE); // Mengambil nilai dari environment variable atau default 60000 jika tidak ada
    const expiration = Math.floor(Date.now() / 1000) + TKN_AGE; // Menghitung waktu kedaluwarsa
    // return this._jwt.generate(payload, process.env.REFRESH_TOKEN_KEY);
    return this._jwt.generate({ ...payload, exp: expiration }, process.env.REFRESH_TOKEN_KEY);
  }

  async createApkToken(payload) {
    const TKN_AGE = parseInt(process.env.APK_TOKEN_AGE); // Mengambil nilai dari environment variable atau default 60000 jika tidak ada
    const expiration = Math.floor(Date.now() / 1000) + TKN_AGE + 600; // Menghitung waktu kedaluwarsa
    // return this._jwt.generate(payload, process.env.REFRESH_TOKEN_KEY);
    return this._jwt.generate({ ...payload, exp: expiration }, process.env.APK_TOKEN_KEY);
  }

  async verifyRefreshToken(token) {
    try {
      const artifacts = this._jwt.decode(token);
      this._jwt.verify(artifacts, process.env.REFRESH_TOKEN_KEY);
    } catch (error) {
      throw new InvariantError('refresh token tidak valid');
    }
  }

  async decodePayload(token) {
    // try {
    const artifacts = this._jwt.decode(token);
    return artifacts.decoded.payload;
    // } catch (error) {
    //   throw new ClientError('Missing authentication');
    // }
  }
}

module.exports = JwtTokenManager;
