class VerifyUserAuthUseCase {
  constructor({ authenticationTokenManager, userRepository, cacheServices }) {
    this._authenticationTokenManager = authenticationTokenManager;
    this._userRepository = userRepository;
    this._cacheService = cacheServices;

  }

  async execute(refreshToken) {
    try {
      this._verifyPayload(refreshToken);
      const datauid = await this._authenticationTokenManager.decodePayload(refreshToken);
      const result = await this._cacheService.get(`datauser:${datauid.username}`);
      const dataresult = JSON.parse(result);
      dataresult.headers = {
        'X-Data-Source': 'cache',
      };
      return dataresult;
    } catch (error) {

      this._verifyPayload(refreshToken);
      const datauid = await this._authenticationTokenManager.decodePayload(refreshToken);
      const datauidit = await this._userRepository.getDataBankByUsername(datauid.username);

      const combinedData = {
        ...datauid,
        ...datauidit
      };
      await this._cacheService.delete(`datauser:${datauid.username}`);
      await this._cacheService.set(`datauser:${datauid.username}`, JSON.stringify(combinedData));
      return combinedData;
    }
  }

  _verifyPayload(refreshToken) {
    if (!refreshToken || refreshToken === undefined || refreshToken == null || refreshToken == '' || typeof refreshToken !== 'string') {
      throw new Error('REFRESH_VERIFY_OWNER_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN');
    }
  }
}

module.exports = VerifyUserAuthUseCase;
