class VerifyUserAuthUseCase {
<<<<<<< HEAD
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
=======
  constructor({ authenticationTokenManager, userRepository }) {
    this._authenticationTokenManager = authenticationTokenManager;
    this._userRepository = userRepository;
  }

  async execute(refreshToken) {
    this._verifyPayload(refreshToken);
    const datauid = await this._authenticationTokenManager.decodePayload(refreshToken);
    const datauidit = await this._userRepository.getDataBankByUsername(datauid.username);

    const combinedData = {
      ...datauid,
      ...datauidit
    };
    return combinedData;
>>>>>>> aaf28ac1629362d7e0c504db6cc6a3a138f07f0b
  }

  _verifyPayload(refreshToken) {
    if (!refreshToken || refreshToken === undefined || refreshToken == null || refreshToken == '' || typeof refreshToken !== 'string') {
      throw new Error('REFRESH_VERIFY_OWNER_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN');
    }
  }
}

module.exports = VerifyUserAuthUseCase;
