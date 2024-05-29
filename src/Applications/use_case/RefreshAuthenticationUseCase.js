<<<<<<< HEAD
const NewAuthentication = require('../../Domains/authentications/entities/NewAuth');

=======
>>>>>>> aaf28ac1629362d7e0c504db6cc6a3a138f07f0b
class RefreshAuthenticationUseCase {
  constructor({
    authenticationRepository,
    authenticationTokenManager,
  }) {
    this._authenticationRepository = authenticationRepository;
    this._authenticationTokenManager = authenticationTokenManager;
  }

  async execute(useCasePayload) {
    this._verifyPayload(useCasePayload);
    const { refreshToken } = useCasePayload;
    await this._authenticationTokenManager.verifyRefreshToken(refreshToken);
    await this._authenticationRepository.checkAvailabilityToken(refreshToken);

    const { username, id } = await this._authenticationTokenManager.decodePayload(refreshToken);
<<<<<<< HEAD
    const accessToken = await this._authenticationTokenManager
      .createAccessToken({ username, id });
    const refreshTokennew = await this._authenticationTokenManager
      .createRefreshToken({ username, id });
    const apkToken = await this._authenticationTokenManager
      .createApkToken({ username, id });

    const newAuthentication = {
      accessToken,
      refreshTokennew,
      apkToken
    };

    await this._authenticationRepository.updatetoken(newAuthentication.refreshTokennew, refreshToken);

    return newAuthentication;
=======

    return this._authenticationTokenManager.createAccessToken({ username, id });
>>>>>>> aaf28ac1629362d7e0c504db6cc6a3a138f07f0b
  }

  _verifyPayload(payload) {
    const { refreshToken } = payload;

    if (!refreshToken) {
      throw new Error('REFRESH_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN');
    }

    if (typeof refreshToken !== 'string') {
      throw new Error('REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = RefreshAuthenticationUseCase;
