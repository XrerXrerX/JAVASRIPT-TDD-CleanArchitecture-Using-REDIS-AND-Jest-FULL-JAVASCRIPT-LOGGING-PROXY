const UserRepository = require('../../../Domains/users/UserRepository');
const AuthenticationRepository = require('../../../Domains/authentications/AuthenticationRepository');
const AuthenticationTokenManager = require('../../security/AuthenticationTokenManager');
const PasswordHash = require('../../security/PasswordHash');
const LoginUserUseCase = require('../LoginUserUseCase');
const NewAuth = require('../../../Domains/authentications/entities/NewAuth');

describe('GetAuthenticationUseCase', () => {
    it('should orchestrating the get authentication action correctly', async () => {
        // Arrange
        const useCasePayload = {
            username: 'fakeuser',
            password: 'secret',
        };
        const mockedAuthentication = new NewAuth({
            accessToken: 'access_token',
            refreshToken: 'refresh_token',
            apkToken: 'apk_token'
        });
        const mockUserRepository = new UserRepository();
        const mockAuthenticationRepository = new AuthenticationRepository();
        const mockAuthenticationTokenManager = new AuthenticationTokenManager();
        const mockPasswordHash = new PasswordHash();

        // Mocking
        mockUserRepository.getPasswordByUsername = jest.fn()
            .mockImplementation(() => Promise.resolve('encrypted_password'));
        mockPasswordHash.comparePassword = jest.fn()
            .mockImplementation(() => Promise.resolve());
        mockAuthenticationTokenManager.createAccessToken = jest.fn()
            .mockImplementation(() => Promise.resolve(mockedAuthentication.accessToken));
        mockAuthenticationTokenManager.createRefreshToken = jest.fn()
            .mockImplementation(() => Promise.resolve(mockedAuthentication.refreshToken));
        mockAuthenticationTokenManager.createApkToken = jest.fn()
            .mockImplementation(() => Promise.resolve(mockedAuthentication.apkToken));
        mockUserRepository.getIdByUsername = jest.fn()
            .mockImplementation(() => Promise.resolve('user123'));
        mockAuthenticationRepository.addToken = jest.fn()
            .mockImplementation(() => Promise.resolve());

        // create use case instance
        const loginUserUseCase = new LoginUserUseCase({
            userRepository: mockUserRepository,
            authenticationRepository: mockAuthenticationRepository,
            authenticationTokenManager: mockAuthenticationTokenManager,
            passwordHash: mockPasswordHash,
        });

        // Action
        const actualAuthentication = await loginUserUseCase.execute(useCasePayload);

        // Assert
        expect(actualAuthentication).toEqual(new NewAuth({
            accessToken: 'access_token',
            refreshToken: 'refresh_token',
            apkToken: 'apk_token'
        }));
        expect(mockUserRepository.getPasswordByUsername)
            .toBeCalledWith('fakeuser');
        expect(mockPasswordHash.comparePassword)
            .toBeCalledWith('secret', 'encrypted_password');
        expect(mockUserRepository.getIdByUsername)
            .toBeCalledWith('fakeuser');
        expect(mockAuthenticationTokenManager.createAccessToken)
            .toBeCalledWith({ username: 'fakeuser', id: 'user123' });
        expect(mockAuthenticationTokenManager.createRefreshToken)
            .toBeCalledWith({ username: 'fakeuser', id: 'user123' });
        expect(mockAuthenticationTokenManager.createApkToken)
            .toBeCalledWith({ username: 'fakeuser', id: 'user123' });
        expect(mockAuthenticationRepository.addToken)
            .toBeCalledWith(mockedAuthentication.refreshToken);
    });
});
