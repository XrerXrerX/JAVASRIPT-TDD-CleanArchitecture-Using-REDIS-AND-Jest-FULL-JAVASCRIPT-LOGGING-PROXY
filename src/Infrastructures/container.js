/* istanbul ignore file */

const { createContainer } = require('instances-container');

// external agency
const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const Jwt = require('@hapi/jwt');
const pool = require('./database/postgres/pool');
const redis = require('redis');


// service (repository, helper, manager, etc)
const PasswordHash = require('../Applications/security/PasswordHash');
const BcryptPasswordHash = require('./security/BcryptPasswordHash');
const UserRepository = require('../Domains/users/UserRepository');
const UserRepositoryPostgres = require('./repository/UserRepositoryPostgres');
const ApkRepository = require('../Domains/apks/ApkRepository');
const BnksRepository = require('../Domains/banks/BnksRepository');
const ApkDataRepositoryPostgres = require('./repository/ApkDataRepositoryPostgres');
const ApkBnksRepositoryPostgres = require('./repository/ApkBnksRepositoryPostgres');
<<<<<<< HEAD
const MemoRepository = require('../Domains/memo/MemoRepository');
const MemoRepositoryPostgres = require('./repository/MemoRepositoryPostgres');
const ContentRepository = require('../Domains/contnt/ContentRepository');
const ContentRepositoryPostgres = require('./repository/ContentRepositoryPostgres');
=======
>>>>>>> aaf28ac1629362d7e0c504db6cc6a3a138f07f0b




// use case
const AddUserUseCase = require('../Applications/use_case/AddUserUseCase');
const AuthenticationTokenManager = require('../Applications/security/AuthenticationTokenManager');
const JwtTokenManager = require('./security/JwtTokenManager');
const LoginUserUseCase = require('../Applications/use_case/LoginUserUseCase');
const AuthenticationRepository = require('../Domains/authentications/AuthenticationRepository');
const AuthenticationRepositoryPostgres = require('./repository/AuthenticationRepositoryPostgres');
const LogoutUserUseCase = require('../Applications/use_case/LogoutUserUseCase');
const RefreshAuthenticationUseCase = require('../Applications/use_case/RefreshAuthenticationUseCase');
const VerifyUserAuthUseCase = require('../Applications/use_case/VerifyUserAuthUseCase');
const AdddataApkUseCase = require('../Applications/use_case/AdddataApkUseCase');
const GetDataApkUseCase = require('../Applications/use_case/GetDataApkUseCase');
const AddbnksUseCase = require('../Applications/use_case/AddbnksUseCase');
<<<<<<< HEAD
const MemoUseCase = require('../Applications/use_case/MemoUseCase');
const ContentUseCase = require('../Applications/use_case/ContentUseCase');
=======
>>>>>>> aaf28ac1629362d7e0c504db6cc6a3a138f07f0b
const CacheServices = require('./caching/redis/CacheServices');


// creating container
const container = createContainer();

// registering services and repository
container.register([
    {
        key: UserRepository.name,
        Class: UserRepositoryPostgres,
        parameter: {
            dependencies: [
                {
                    concrete: pool,
                },
                {
                    concrete: nanoid,
                },
            ],
        },
    },

    {
        key: PasswordHash.name,
        Class: BcryptPasswordHash,
        parameter: {
            dependencies: [
                {
                    concrete: bcrypt,
                },
            ],
        },
    },
    {
        key: AuthenticationRepository.name,
        Class: AuthenticationRepositoryPostgres,
        parameter: {
            dependencies: [
                {
                    concrete: pool,
                },
            ],
        },
    },

    {
        key: AuthenticationTokenManager.name,
        Class: JwtTokenManager,
        parameter: {
            dependencies: [
                {
                    concrete: Jwt.token,
                },
            ],
        },
    },
    {
        key: BnksRepository.name,
        Class: ApkBnksRepositoryPostgres,
        parameter: {
            dependencies: [
                {
                    concrete: pool,
                },
                {
                    concrete: redis,
                }
            ],
        },
    },
    {
        key: ApkRepository.name,
        Class: ApkDataRepositoryPostgres,
        parameter: {
            dependencies: [
                {
                    concrete: pool,
                },
                {
                    concrete: nanoid,
                },
                {
                    concrete: redis,
                }
            ],
        },
    },
    {
<<<<<<< HEAD
        key: MemoRepository.name,
        Class: MemoRepositoryPostgres,
        parameter: {
            dependencies: [
                {
                    concrete: pool,
                },
                {
                    concrete: nanoid,
                },
                {
                    concrete: redis,
                }
            ],
        },
    },
    {
        key: ContentRepository.name,
        Class: ContentRepositoryPostgres,
        parameter: {
            dependencies: [
                {
                    concrete: pool,
                },
                {
                    concrete: redis,
                }
            ],
        },
    },
    {
=======
>>>>>>> aaf28ac1629362d7e0c504db6cc6a3a138f07f0b
        key: CacheServices.name,
        Class: CacheServices,
        parameter: {
            dependencies: [
                {
                    concrete: redis,
                }
            ],
        },
    },
]);

// registering use cases
container.register([
    {
        key: AddUserUseCase.name,
        Class: AddUserUseCase,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                {
                    name: 'userRepository',
                    internal: UserRepository.name,
                },
                {
                    name: 'passwordHash',
                    internal: PasswordHash.name,
                },
<<<<<<< HEAD
                {
                    name: 'cacheServices',
                    internal: CacheServices.name,
                },
=======
>>>>>>> aaf28ac1629362d7e0c504db6cc6a3a138f07f0b
            ],
        },
    },
    {
        key: LoginUserUseCase.name,
        Class: LoginUserUseCase,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                {
                    name: 'userRepository',
                    internal: UserRepository.name,
                },
                {
                    name: 'authenticationRepository',
                    internal: AuthenticationRepository.name,
                },
                {
                    name: 'authenticationTokenManager',
                    internal: AuthenticationTokenManager.name,
                },
                {
                    name: 'passwordHash',
                    internal: PasswordHash.name,
                },
            ],
        },
    },
    {
        key: LogoutUserUseCase.name,
        Class: LogoutUserUseCase,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                {
                    name: 'authenticationRepository',
                    internal: AuthenticationRepository.name,
                },
            ],
        },
    },
    {
        key: RefreshAuthenticationUseCase.name,
        Class: RefreshAuthenticationUseCase,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                {
                    name: 'authenticationRepository',
                    internal: AuthenticationRepository.name,
                },
                {
                    name: 'authenticationTokenManager',
                    internal: AuthenticationTokenManager.name,
                },

            ],
        },
    },
    {
        key: VerifyUserAuthUseCase.name,
        Class: VerifyUserAuthUseCase,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                {
                    name: 'authenticationTokenManager',
                    internal: AuthenticationTokenManager.name,
                },
                {
                    name: 'userRepository',
                    internal: UserRepository.name,
                },
<<<<<<< HEAD
                {
                    name: 'cacheServices',
                    internal: CacheServices.name,
                },
=======
>>>>>>> aaf28ac1629362d7e0c504db6cc6a3a138f07f0b
            ],
        },
    },
    {
        key: AdddataApkUseCase.name,
        Class: AdddataApkUseCase,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                {
                    name: 'apkRepository',
                    internal: ApkRepository.name,
                },
<<<<<<< HEAD
=======

>>>>>>> aaf28ac1629362d7e0c504db6cc6a3a138f07f0b
                {
                    name: 'cacheServices',
                    internal: CacheServices.name,
                },
            ],
        },
    },
    {
        key: GetDataApkUseCase.name,
        Class: GetDataApkUseCase,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                {
                    name: 'apkRepository',
                    internal: ApkRepository.name,
                },
                {
                    name: 'cacheServices',
                    internal: CacheServices.name,
                },
            ],
        },
    },
    {
        key: AddbnksUseCase.name,
        Class: AddbnksUseCase,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                {
                    name: 'bnksRepository',
                    internal: BnksRepository.name,
                },
                {
                    name: 'cacheServices',
                    internal: CacheServices.name,
                },
            ],
        },
    }
<<<<<<< HEAD
    , {
        key: ContentUseCase.name,
        Class: ContentUseCase,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                {
                    name: 'contentRepository',
                    internal: ContentRepository.name,
                },
                {
                    name: 'cacheServices',
                    internal: CacheServices.name,
                },
            ],
        },
    }
    , {
        key: MemoUseCase.name,
        Class: MemoUseCase,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                {
                    name: 'memoRepository',
                    internal: MemoRepository.name,
                },
                {
                    name: 'cacheServices',
                    internal: CacheServices.name,
                },
            ],
        },
    }
=======
>>>>>>> aaf28ac1629362d7e0c504db6cc6a3a138f07f0b

]);

module.exports = container;
