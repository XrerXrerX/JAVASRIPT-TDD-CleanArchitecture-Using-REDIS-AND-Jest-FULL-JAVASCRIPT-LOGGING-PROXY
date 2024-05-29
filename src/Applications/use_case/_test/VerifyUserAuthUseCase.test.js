const UserRepository = require('../../../Domains/users/UserRepository');
const AuthenticationTokenManager = require('../../security/AuthenticationTokenManager');
const VerifyUserAuthUseCase = require('../VerifyUserAuthUseCase');
<<<<<<< HEAD
const CacheService = require('../../caching/CacheService');
=======
>>>>>>> aaf28ac1629362d7e0c504db6cc6a3a138f07f0b

describe('RefreshAuthenticationUseCase', () => {
  it('should throw error if use case payload not contain refresh token', async () => {
    // Arrange
    const useCasePayload = '';
    const refreshAuthenticationUseCase = new VerifyUserAuthUseCase({});

    // Action & Assert
    await expect(refreshAuthenticationUseCase.execute(useCasePayload))
      .rejects
      .toThrowError('REFRESH_VERIFY_OWNER_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN');
  });


<<<<<<< HEAD

  it('should orchestrating the refresh authentication action using caching', async () => {
    // Arrange
    const useCasePayload = 'some_refresh_token';
    const datauid = { username: 'dicoding', id: 'user-123', iat: '1710139445' };

    const resultuid = {
      username: 'dicoding',
      id: 'user-123',
      iat: '1710139445',
      bank: 'bca',
      nama_rek: 'jaya kuku',
      norek: '777777747474',
      group: 'groupbank1',
      groupwd: 'groupbankwd1',
      is_verified: false,
      headers: {
        'X-Data-Source': 'cache',
      }
    }
      ;

    const mockcacheService = new CacheService();
    const mockAuthenticationTokenManager = new AuthenticationTokenManager();

    mockAuthenticationTokenManager.decodePayload = jest.fn()
      .mockImplementation(() => Promise.resolve({ username: 'dicoding', id: 'user-123', iat: '1710139445' }));
    mockcacheService.get = jest.fn().mockResolvedValue(JSON.stringify(resultuid));

    const getuserdataUseCase = new VerifyUserAuthUseCase({
      authenticationTokenManager: mockAuthenticationTokenManager,
      cacheServices: mockcacheService
    });
    // Mocking

    const getdatausecase = await getuserdataUseCase.execute(useCasePayload);
    expect(mockcacheService.get).toBeCalledWith(`datauser:${datauid.username}`);
    expect(getdatausecase).toEqual(
      resultuid
    );
  });
=======
>>>>>>> aaf28ac1629362d7e0c504db6cc6a3a138f07f0b
  it('should orchestrating the refresh authentication action correctly', async () => {
    // Arrange
    const useCasePayload = 'some_refresh_token';
    const datauid = { username: 'dicoding', id: 'user-123', iat: '1710139445' };

    const resultuid = {
      username: 'dicoding',
      id: 'user-123',
      iat: '1710139445',
      bank: 'bca',
      nama_rek: 'jaya kuku',
      norek: '777777747474',
      group: 'groupbank1',
      groupwd: 'groupbankwd1',
      is_verified: false

    };

    const mockAuthenticationTokenManager = new AuthenticationTokenManager();
    const mockUserRepository = new UserRepository();
<<<<<<< HEAD
    const mockcacheService = new CacheService();

=======
>>>>>>> aaf28ac1629362d7e0c504db6cc6a3a138f07f0b
    // Mocking

    mockAuthenticationTokenManager.decodePayload = jest.fn()
      .mockImplementation(() => Promise.resolve({ username: 'dicoding', id: 'user-123', iat: '1710139445' }));
    mockUserRepository.getDataBankByUsername = jest.fn()
      .mockImplementation(() => Promise.resolve({
        bank: 'bca', nama_rek: 'jaya kuku', norek: '777777747474', group: 'groupbank1', groupwd: 'groupbankwd1', is_verified: false
      }));
<<<<<<< HEAD
    mockcacheService.delete = jest.fn().mockResolvedValue();
    mockcacheService.set = jest.fn().mockResolvedValue();
=======
>>>>>>> aaf28ac1629362d7e0c504db6cc6a3a138f07f0b

    // Create the use case instace
    const refreshAuthenticationUseCase = new VerifyUserAuthUseCase({
      authenticationTokenManager: mockAuthenticationTokenManager,
      userRepository: mockUserRepository,
<<<<<<< HEAD
      cacheServices: mockcacheService

=======
>>>>>>> aaf28ac1629362d7e0c504db6cc6a3a138f07f0b
    });

    // Action
    const payload = await refreshAuthenticationUseCase.execute(useCasePayload);
    // Assert

    expect(mockAuthenticationTokenManager.decodePayload)
      .toBeCalledWith(useCasePayload);
    expect(mockUserRepository.getDataBankByUsername)
      .toBeCalledWith(datauid.username);
<<<<<<< HEAD
    expect(mockcacheService.delete).toBeCalledWith(`datauser:${datauid.username}`);
    expect(mockcacheService.set).toBeCalledWith(`datauser:${datauid.username}`, JSON.stringify(resultuid));
=======
>>>>>>> aaf28ac1629362d7e0c504db6cc6a3a138f07f0b

    expect(payload).toEqual(resultuid);
  });
});
