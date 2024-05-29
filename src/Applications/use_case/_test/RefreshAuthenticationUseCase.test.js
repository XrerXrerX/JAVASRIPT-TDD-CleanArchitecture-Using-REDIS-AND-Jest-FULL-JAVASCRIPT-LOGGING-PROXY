const AuthenticationRepository = require('../../../Domains/authentications/AuthenticationRepository');
const AuthenticationTokenManager = require('../../security/AuthenticationTokenManager');
const RefreshAuthenticationUseCase = require('../RefreshAuthenticationUseCase');
<<<<<<< HEAD
const NewAuth = require('../../../Domains/authentications/entities/NewAuth');
=======
>>>>>>> aaf28ac1629362d7e0c504db6cc6a3a138f07f0b

describe('RefreshAuthenticationUseCase', () => {
  it('should throw error if use case payload not contain refresh token', async () => {
    // Arrange
    const useCasePayload = {};
    const refreshAuthenticationUseCase = new RefreshAuthenticationUseCase({});

    // Action & Assert
    await expect(refreshAuthenticationUseCase.execute(useCasePayload))
      .rejects
      .toThrowError('REFRESH_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN');
  });

  it('should throw error if refresh token not string', async () => {
    // Arrange
    const useCasePayload = {
      refreshToken: 1,
    };
    const refreshAuthenticationUseCase = new RefreshAuthenticationUseCase({});

    // Action & Assert
    await expect(refreshAuthenticationUseCase.execute(useCasePayload))
      .rejects
      .toThrowError('REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should orchestrating the refresh authentication action correctly', async () => {
    // Arrange
    const useCasePayload = {
      refreshToken: 'some_refresh_token',
    };
<<<<<<< HEAD

    const mockedAuthentication = new NewAuth({
      accessToken: 'access_token',
      refreshToken: 'refresh_token',
      apkToken: 'apk_token'
    });


=======
>>>>>>> aaf28ac1629362d7e0c504db6cc6a3a138f07f0b
    const mockAuthenticationRepository = new AuthenticationRepository();
    const mockAuthenticationTokenManager = new AuthenticationTokenManager();
    // Mocking
    mockAuthenticationRepository.checkAvailabilityToken = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockAuthenticationTokenManager.verifyRefreshToken = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockAuthenticationTokenManager.decodePayload = jest.fn()
      .mockImplementation(() => Promise.resolve({ username: 'dicoding', id: 'user-123' }));
    mockAuthenticationTokenManager.createAccessToken = jest.fn()
<<<<<<< HEAD
      .mockImplementation(() => Promise.resolve(mockedAuthentication.accessToken));
    mockAuthenticationTokenManager.createRefreshToken = jest.fn()
      .mockImplementation(() => Promise.resolve(mockedAuthentication.refreshToken));
    mockAuthenticationTokenManager.createApkToken = jest.fn()
      .mockImplementation(() => Promise.resolve(mockedAuthentication.apkToken));
    mockAuthenticationRepository.updatetoken = jest.fn()
      .mockImplementation(() => Promise.resolve());
=======
      .mockImplementation(() => Promise.resolve('some_new_access_token'));
>>>>>>> aaf28ac1629362d7e0c504db6cc6a3a138f07f0b
    // Create the use case instace
    const refreshAuthenticationUseCase = new RefreshAuthenticationUseCase({
      authenticationRepository: mockAuthenticationRepository,
      authenticationTokenManager: mockAuthenticationTokenManager,
    });

    // Action
<<<<<<< HEAD
    const accessTokennew = await refreshAuthenticationUseCase.execute(useCasePayload);
    expect(accessTokennew).toEqual({
      accessToken: 'access_token',
      refreshTokennew: 'refresh_token',
      apkToken: 'apk_token'
    });
=======
    const accessToken = await refreshAuthenticationUseCase.execute(useCasePayload);

>>>>>>> aaf28ac1629362d7e0c504db6cc6a3a138f07f0b
    // Assert
    expect(mockAuthenticationTokenManager.verifyRefreshToken)
      .toBeCalledWith(useCasePayload.refreshToken);
    expect(mockAuthenticationRepository.checkAvailabilityToken)
      .toBeCalledWith(useCasePayload.refreshToken);
    expect(mockAuthenticationTokenManager.decodePayload)
      .toBeCalledWith(useCasePayload.refreshToken);
    expect(mockAuthenticationTokenManager.createAccessToken)
      .toBeCalledWith({ username: 'dicoding', id: 'user-123' });
<<<<<<< HEAD
    expect(mockAuthenticationTokenManager.createRefreshToken)
      .toBeCalledWith({ username: 'dicoding', id: 'user-123' });
    expect(mockAuthenticationTokenManager.createApkToken)
      .toBeCalledWith({ username: 'dicoding', id: 'user-123' });

    expect(mockAuthenticationRepository.updatetoken)
      .toBeCalledWith(mockedAuthentication.refreshToken, useCasePayload.refreshToken);

=======
    expect(accessToken).toEqual('some_new_access_token');
>>>>>>> aaf28ac1629362d7e0c504db6cc6a3a138f07f0b
  });
});
