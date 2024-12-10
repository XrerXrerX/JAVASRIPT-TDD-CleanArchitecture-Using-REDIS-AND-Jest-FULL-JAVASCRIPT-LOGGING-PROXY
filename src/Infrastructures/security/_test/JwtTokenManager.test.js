const Jwt = require('@hapi/jwt');
const InvariantError = require('../../../Commons/exceptions/InvariantError');
const JwtTokenManager = require('../JwtTokenManager');

describe('JwtTokenManager', () => {
  describe('createAccessToken function', () => {
    it('should create accessToken correctly', async () => {
      // Arrange
      const payload = {
        username: 'dicoding',
      };
      const TKN_AGE = parseInt(process.env.ACCCESS_TOKEN_AGE); // Mengambil nilai dari environment variable atau default 60000 jika tidak ada
      const expiration = Math.floor(Date.now() / 1000) + TKN_AGE + 600; // Menghitung waktu kedaluwarsa

      const mockJwtToken = {
        generate: jest.fn().mockImplementation(() => 'mock_token'),
      };
      const jwtTokenManager = new JwtTokenManager(mockJwtToken);

      // Action
      const accessToken = await jwtTokenManager.createAccessToken(payload);

      // Assert
      expect(mockJwtToken.generate).toBeCalledWith({ ...payload, exp: expiration }, process.env.ACCESS_TOKEN_KEY);
      expect(accessToken).toEqual('mock_token');
    });
  });

  describe('createRefreshToken function', () => {
    it('should create refreshToken correctly', async () => {
      // Arrange
      const payload = {
        username: 'dicoding',
      };
      const TKN_AGE = parseInt(process.env.ACCCESS_TOKEN_AGE); // Mengambil nilai dari environment variable atau default 60000 jika tidak ada
      const expiration = Math.floor(Date.now() / 1000) + TKN_AGE; // Menghitung waktu kedaluwarsa


      const mockJwtToken = {
        generate: jest.fn().mockImplementation(() => 'mock_token'),
      };
      const jwtTokenManager = new JwtTokenManager(mockJwtToken);

      // Action
      const refreshToken = await jwtTokenManager.createRefreshToken(payload);

      // Assert
      expect(mockJwtToken.generate).toBeCalledWith({ ...payload, exp: expiration }, process.env.REFRESH_TOKEN_KEY);
      expect(refreshToken).toEqual('mock_token');
    });

    describe('createapktoken function', () => {

      it('should create apktoken correctly', async () => {
        // Arrange
        const payload = {
          username: 'dicoding',
        };
        const TKN_AGE = parseInt(process.env.APK_TOKEN_AGE); // Mengambil nilai dari environment variable atau default 60000 jika tidak ada
        const expiration = Math.floor(Date.now() / 1000) + TKN_AGE + 600; // Menghitung waktu kedaluwarsa

        const mockJwtToken = {
          generate: jest.fn().mockImplementation(() => 'mock_token'),
        };
        const jwtTokenManager = new JwtTokenManager(mockJwtToken);

        // Action
        const apktoken = await jwtTokenManager.createApkToken(payload);

        // Assert
        expect(mockJwtToken.generate).toBeCalledWith({ ...payload, exp: expiration }, process.env.APK_TOKEN_KEY);
        expect(apktoken).toEqual('mock_token');
      });
    });
  });



  describe('verifyRefreshToken function', () => {
    it('should throw InvariantError when verification failed', async () => {
      // Arrange
      const jwtTokenManager = new JwtTokenManager(Jwt.token);
      const accessToken = await jwtTokenManager.createAccessToken({ username: 'dicoding' });

      // Action & Assert
      await expect(jwtTokenManager.verifyRefreshToken(accessToken))
        .rejects
        .toThrow(InvariantError);
    });

    it('should not throw InvariantError when refresh token verified', async () => {
      // Arrange
      const jwtTokenManager = new JwtTokenManager(Jwt.token);
      const refreshToken = await jwtTokenManager.createRefreshToken({ username: 'dicoding' });

      // Action & Assert
      await expect(jwtTokenManager.verifyRefreshToken(refreshToken))
        .resolves
        .not.toThrow(InvariantError);
    });
  });

  describe('decodePayload function', () => {
    it('should decode payload correctly', async () => {
      // Arrange
      const jwtTokenManager = new JwtTokenManager(Jwt.token);
      const accessToken = await jwtTokenManager.createAccessToken({ username: 'dicoding' });

      // Action
      const { username: expectedUsername } = await jwtTokenManager.decodePayload(accessToken);

      // Action & Assert
      expect(expectedUsername).toEqual('dicoding');
    });
  });
});
