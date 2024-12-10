const UpdateDataUser = require('../../../Domains/users/entities/UpdateDataUser');
const ChangePassw = require('../../../Domains/users/entities/ChangePassw');
const RegisterUser = require('../../../Domains/users/entities/RegisterUser');
const RegisterUserLog = require('../../../Domains/users/entities/RegisterUserLog');
const RegisteredUser = require('../../../Domains/users/entities/RegisteredUser');
const RegisteredUserLog = require('../../../Domains/users/entities/RegisteredUserLog');
const UserRepository = require('../../../Domains/users/UserRepository');
const PasswordHash = require('../../security/PasswordHash');
const AddUserUseCase = require('../AddUserUseCase');
const CacheService = require('../../caching/CacheService');


describe('UserRepository', () => {
    /**
     * Menguji apakah use case mampu mengoskestrasikan langkah demi langkah dengan benar.
     */
    describe('ADD USER UserRepository ', () => {

        it('should orchestracing the add user action correctly', async () => {

            const useCasePayload = {
                xyusernamexxy: 'fakeuser',
                password: 'secret',
                xybanknamexyy: 'abc',
                xybankuserxy: 'fake name',
                xxybanknumberxy: '12345678',
                xyx11xuser_mailxxyy: 'user@gmail.com',
                xynumbphonexyyy: '58469874451',
            };


            const mockRegisteredUser = new RegisteredUser({
                xyuseridxy: 'user123',
                xyusernamexxy: useCasePayload.xyusernamexxy,
            });
            const mockRegisteredLogbase = new RegisteredUserLog({
                xyuseridxy: mockRegisteredUser.xyuseridxy,
                username: useCasePayload.xyusernamexxy,
            });


            /** creating dependency of use case */
            const mockUserRepository = new UserRepository();
            const mockPasswordHash = new PasswordHash();

            /** mocking needed function */
            mockUserRepository.verifydoublebankuser = jest.fn()
                .mockImplementation(() => Promise.resolve());
            mockUserRepository.verifyAvailableUsername = jest.fn()
                .mockImplementation(() => Promise.resolve());
            mockUserRepository.verifybankuser = jest.fn()
                .mockImplementation(() => Promise.resolve());
            mockPasswordHash.hash = jest.fn()
                .mockImplementation(() => Promise.resolve('secret'));

            mockUserRepository.addUser = jest.fn()
                .mockImplementation(() => Promise.resolve(mockRegisteredUser));
            mockUserRepository.addEventUser = jest.fn()
                .mockImplementation(() => Promise.resolve());
            // mockUserRepository.addReffUser = jest.fn()
            //     .mockImplementation(() => Promise.resolve());
            mockUserRepository.addLogBase = jest.fn()
                .mockImplementation(() => Promise.resolve(mockRegisteredLogbase));


            const getUserUseCase = new AddUserUseCase({
                userRepository: mockUserRepository,
                passwordHash: mockPasswordHash,
            });


            // Action
            const registeredUserLog = await getUserUseCase.execute(useCasePayload);

            expect(registeredUserLog).toStrictEqual(new RegisteredUserLog({
                xyuseridxy: 'user123',
                username: useCasePayload.xyusernamexxy,
            }));
            expect(mockUserRepository.verifydoublebankuser).toBeCalledWith(useCasePayload);
            expect(mockUserRepository.verifyAvailableUsername).toBeCalledWith(useCasePayload);
            expect(mockUserRepository.verifybankuser).toBeCalledWith(useCasePayload);

            expect(mockPasswordHash.hash).toBeCalledWith(useCasePayload.password);
            expect(mockUserRepository.addUser).toBeCalledWith(new RegisterUser({
                xyusernamexxy: useCasePayload.xyusernamexxy,
                password: 'secret',
                xybanknamexyy: 'abc',
                xybankuserxy: 'fake name',
                xxybanknumberxy: '12345678',
                xyx11xuser_mailxxyy: 'user@gmail.com',
                xynumbphonexyyy: '58469874451',
            }));

            expect(mockUserRepository.addEventUser).toBeCalledWith('user123'
            );
            // expect(mockUserRepository.addReffUser).toBeCalledWith('user123');
            expect(mockUserRepository.addLogBase).toBeCalledWith(new RegisterUserLog({
                xyuseridxy: 'user123',
                xyusernamexxy: 'fakeuser',
                password: 'secret',
            }));
        });
    });
    describe('GET DATA UserRepository', () => {

        it('should orchestracing the Get data user action correctly', async () => {
            const params = {
                xxuserxx: 'fakeuser'
            };

            const resultmocksettings = {
                xyusernamexxy: 'fakeuser333',
                xybanknamexyy: 'abc',
                xybankuserxy: 'fake name',
                xxybanknumberxy: '12345678AA',
                group: 'groupbank2',
                groupwd: 'groupbankwd2',
                xyx11xuser_mailxxyy: 'user@gmail.com',
                xynumbphonexyyy: '58469874451',
                is_verified: false
            }

            /** creating dependency of use case */
            const mockUserRepository = new UserRepository();


            mockUserRepository.GetDataByUsername = jest.fn()
                .mockImplementation(() => Promise.resolve(resultmocksettings));

            const getDataUsecaseByU = new AddUserUseCase({
                userRepository: mockUserRepository,
            });

            const getdataByU = await getDataUsecaseByU.getdatabyu(params);

            expect(getdataByU).toStrictEqual(resultmocksettings);
            expect(mockUserRepository.GetDataByUsername).toBeCalledWith(params.xxuserxx);
        });
    });
    describe('EDIT DATA UserRepository', () => {

        it('should updated data user correctly', async () => {
            const params = {
                xyusernamexxy: 'fakeuser'
            };

            const useCasePayload = new UpdateDataUser({
                xybanknamexyy: 'abc',
                xybankuserxy: 'fake name',
                xxybanknumberxy: '12345611',
                group: 'groupbank2',
                groupwd: 'groupbankwd2',
            });
            const mockUserRepository = new UserRepository();
            const mockcacheService = new CacheService();



            mockUserRepository.UDataUser = jest.fn()
                .mockImplementation(() => Promise.resolve('data berhasil di updated !'));
            mockcacheService.delete = jest.fn().mockResolvedValue();

            const putDataUseCaseByU = new AddUserUseCase({
                userRepository: mockUserRepository,
                cacheServices: mockcacheService
            });

            const putDataByU = await putDataUseCaseByU.UDataUser(useCasePayload, params);

            expect(putDataByU).toStrictEqual('data berhasil di updated !');
            expect(mockcacheService.delete).toBeCalledWith(`datauser:${params.xyusernamexxy}`);

            expect(mockUserRepository.UDataUser).toBeCalledWith(useCasePayload, params);

        });

        it('should updated VIP  user correctly', async () => {
            const params = {
                xyusernamexxy: 'fakeuser'
            };

            const useCasePayload = {
                is_verified: true
            };
            const mockUserRepository = new UserRepository();
            const mockcacheService = new CacheService();


            mockUserRepository.Uvipuser = jest.fn()
                .mockImplementation(() => Promise.resolve('data berhasil di updated !'));
            mockcacheService.delete = jest.fn().mockResolvedValue();

            const putDataUseCaseByU = new AddUserUseCase({
                userRepository: mockUserRepository,
                cacheServices: mockcacheService

            });

            const putDataByU = await putDataUseCaseByU.Uvipuser(useCasePayload, params);

            expect(putDataByU).toStrictEqual('data berhasil di updated !');
            expect(mockUserRepository.Uvipuser).toBeCalledWith(useCasePayload, params);
            expect(mockcacheService.delete).toBeCalledWith(`datauser:${params.xyusernamexxy}`);

        });
    });
    describe('CHANGE PASSWORDUserRepository', () => {

        it('should change password securely', async () => {

            const params = {
                xyusernamexxy: 'fakeuser221'
            };

            const useCasePayload = new ChangePassw({
                password: 'asdad123a',
            });

            const restpas = "mockhaspassword";

            const mockUserRepository = new UserRepository();
            const mockPasswordHash = new PasswordHash();




            mockPasswordHash.hash = jest.fn()
                .mockImplementation(() => Promise.resolve(restpas));
            mockUserRepository.changepssw = jest.fn()
                .mockImplementation(() => Promise.resolve('password berhasil diubah !'));


            const chngpsswusecase = new AddUserUseCase({
                userRepository: mockUserRepository,
                passwordHash: mockPasswordHash,
            });

            const changepassworddone = await chngpsswusecase.changepssw(useCasePayload, params);

            expect(changepassworddone).toEqual("password berhasil diubah !");


            expect(mockPasswordHash.hash).toBeCalledWith(useCasePayload.password);
            expect(mockUserRepository.changepssw).toBeCalledWith(restpas, params.xyusernamexxy);

        });
    });
});