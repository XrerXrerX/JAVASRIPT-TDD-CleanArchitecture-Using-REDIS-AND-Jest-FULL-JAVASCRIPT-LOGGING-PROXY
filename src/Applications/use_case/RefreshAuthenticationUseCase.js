const NewAuthentication = require('../../Domains/authentications/entities/NewAuth');

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
