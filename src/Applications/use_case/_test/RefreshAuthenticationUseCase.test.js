const AuthenticationRepository = require('../../../Domains/authentications/AuthenticationRepository');
const AuthenticationTokenManager = require('../../security/AuthenticationTokenManager');
const RefreshAuthenticationUseCase = require('../RefreshAuthenticationUseCase');
const NewAuth = require('../../../Domains/authentications/entities/NewAuth');

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

    const mockedAuthentication = new NewAuth({
      accessToken: 'access_token',
      refreshToken: 'refresh_token',
      apkToken: 'apk_token'
    });


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
      .mockImplementation(() => Promise.resolve(mockedAuthentication.accessToken));
    mockAuthenticationTokenManager.createRefreshToken = jest.fn()
      .mockImplementation(() => Promise.resolve(mockedAuthentication.refreshToken));
    mockAuthenticationTokenManager.createApkToken = jest.fn()
      .mockImplementation(() => Promise.resolve(mockedAuthentication.apkToken));
    mockAuthenticationRepository.updatetoken = jest.fn()
      .mockImplementation(() => Promise.resolve());
    // Create the use case instace
    const refreshAuthenticationUseCase = new RefreshAuthenticationUseCase({
      authenticationRepository: mockAuthenticationRepository,
      authenticationTokenManager: mockAuthenticationTokenManager,
    });

    // Action
    const accessTokennew = await refreshAuthenticationUseCase.execute(useCasePayload);
    expect(accessTokennew).toEqual({
      accessToken: 'access_token',
      refreshTokennew: 'refresh_token',
      apkToken: 'apk_token'
    });
    // Assert
    expect(mockAuthenticationTokenManager.verifyRefreshToken)
      .toBeCalledWith(useCasePayload.refreshToken);
    expect(mockAuthenticationRepository.checkAvailabilityToken)
      .toBeCalledWith(useCasePayload.refreshToken);
    expect(mockAuthenticationTokenManager.decodePayload)
      .toBeCalledWith(useCasePayload.refreshToken);
    expect(mockAuthenticationTokenManager.createAccessToken)
      .toBeCalledWith({ username: 'dicoding', id: 'user-123' });
    expect(mockAuthenticationTokenManager.createRefreshToken)
      .toBeCalledWith({ username: 'dicoding', id: 'user-123' });
    expect(mockAuthenticationTokenManager.createApkToken)
      .toBeCalledWith({ username: 'dicoding', id: 'user-123' });

    expect(mockAuthenticationRepository.updatetoken)
      .toBeCalledWith(mockedAuthentication.refreshToken, useCasePayload.refreshToken);

  });
});
