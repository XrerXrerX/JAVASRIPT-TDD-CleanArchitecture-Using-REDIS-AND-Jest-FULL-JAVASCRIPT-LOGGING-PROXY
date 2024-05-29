const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const UsersLogTableTestHelper = require('../../../../tests/UsersLogTableTestHelper');
const UsersEventTableTestHelper = require('../../../../tests/UsersEventTableTestHelper');
const UsersReffsTableTestHelper = require('../../../../tests/UsersReffsTableTestHelper');
const InvariantError = require('../../../Commons/exceptions/InvariantError');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const RegisterUser = require('../../../Domains/users/entities/RegisterUser');
const UpdateDataUser = require('../../../Domains/users/entities/UpdateDataUser');
const ChangePassw = require('../../../Domains/users/entities/ChangePassw');
const RegisterUserLog = require('../../../Domains/users/entities/RegisterUserLog');
const RegisteredUser = require('../../../Domains/users/entities/RegisteredUser');
const pool = require('../../database/postgres/pool');
const UserRepositoryPostgres = require('../UserRepositoryPostgres');

describe('UserRepositoryPostgres', () => {
    afterEach(async () => {
        await UsersTableTestHelper.cleanTable();
        await UsersLogTableTestHelper.cleanTable();
        await UsersEventTableTestHelper.cleanTable();
        await UsersReffsTableTestHelper.cleanTable();
    });

    afterAll(async () => {
        await pool.end();
    });

    describe('verifyAvailableUsername function', () => {
        it('should throw InvariantError when username not available', async () => {
            const registerUser = {
                xyusernamexxy: 'fakeuser',
            };

            // Arrange
            await UsersTableTestHelper.addUser({ xyusernamexxy: 'fakeuser' }); // memasukan user baru dengan username dicoding
            const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});

            // Action & Assert
            await expect(userRepositoryPostgres.verifyAvailableUsername(registerUser)).rejects.toThrowError(InvariantError);
        });

        it('should throw InvariantError when bank number already in ourdatabase', async () => {
            const registerUser = {
                xybanknamexyy: 'abc',
                xxybanknumberxy: '12345678',
            };

            // Arrange
            await UsersTableTestHelper.addUser({ xybanknamexyy: 'abc', xxybanknumberxy: '12345678' }); // memasukan user baru dengan username dicoding
            const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});

            // Action & Assert
            await expect(userRepositoryPostgres.verifybankuser(registerUser)).rejects.toThrowError(InvariantError);
        });

        it('should throw InvariantError when bank number already in ourdatabase', async () => {
            const registerUser = {
                xyusernamexxy: 'fakeuser',
                xxybanknumberxy: '12345678'
            };

            // Arrange
            await UsersTableTestHelper.addUser({ xyusernamexxy: 'fakeuser', xxybanknumberxy: '12345678' }); // memasukan user baru dengan username dicoding
            const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});

            // Action & Assert
            await expect(userRepositoryPostgres.verifydoublebankuser(registerUser)).rejects.toThrowError(InvariantError);
        });

        // it('should not throw InvariantError when bank and user bank in different available', async () => {
        //     // Arrange
        //     const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});

        //     // Action & Assert
        //     await expect(userRepositoryPostgres.verifyAvailableUsername('dicoding')).resolves.not.toThrowError(InvariantError);
        // });
    });

    describe('addUser function', () => {
        it('should persist register user and return registered user correctly', async () => {
            // Arrange
            const registerUser = new RegisterUser({
                xyusernamexxy: 'fakeuser',
                password: 'secret',
                xybanknamexyy: 'abc',
                xybankuserxy: 'fake name',
                xxybanknumberxy: '12345678',
                xyx11xuser_mailxxyy: 'user@gmail.com',
                xynumbphonexyyy: '58469874451',
            });
            const fakeIdGenerator = () => '123'; // stub!
            const userRepositoryPostgres = new UserRepositoryPostgres(pool, fakeIdGenerator);

            // Action
            await userRepositoryPostgres.addUser(registerUser);

            // Assert
            const users = await UsersTableTestHelper.findUsersById('user123');
            expect(users).toHaveLength(1);
        });

        it('should return registered user correctly', async () => {
            // Arrange
            const registerUser = new RegisterUser({
                xyusernamexxy: 'fakeuser',
                password: 'secret',
                xybanknamexyy: 'abc',
                xybankuserxy: 'fake name',
                xxybanknumberxy: '12345678',
                xyx11xuser_mailxxyy: 'user@gmail.com',
                xynumbphonexyyy: '58469874451',
            });
            const fakeIdGenerator = () => '123'; // stub!
            const userRepositoryPostgres = new UserRepositoryPostgres(pool, fakeIdGenerator);

            // Action
            const registeredUser = await userRepositoryPostgres.addUser(registerUser);

            // Assert
            expect(registeredUser).toStrictEqual(new RegisteredUser({
                xyuseridxy: 'user123',
                xyusernamexxy: 'fakeuser',
            }));
        });

        describe('add userevent ', () => {
            it('should persist userevent user and return registered user correctly', async () => {
                const registerUserLog = 'user123';
                const fakeIdGenerator = () => '123'; // stub!
                const userRepositoryPostgres = new UserRepositoryPostgres(pool, fakeIdGenerator);

                // Action
                await userRepositoryPostgres.addEventUser(registerUserLog);

                // Assert
                const users = await UsersEventTableTestHelper.findUsersByIdevent('user123');
                expect(users).toHaveLength(1);
            });

        });



        // describe('add userreffs ', () => {
        //     it('should persist userreffs user and return registered user correctly', async () => {
        //         const registerUserLog = 'user123';
        //         const fakeIdGenerator = () => '123'; // stub!
        //         const userRepositoryPostgres = new UserRepositoryPostgres(pool, fakeIdGenerator);

        //         // Action
        //         await userRepositoryPostgres.addReffUser(registerUserLog);

        //         // Assert
        //         const users = await UsersReffsTableTestHelper.findUsersByIdreffs('user123');
        //         expect(users).toHaveLength(1);
        //     });

        // });



        describe('add userlogbase ', () => {
            it('should persist logbase user and return registered user correctly', async () => {
                const registerUserLog = new RegisterUserLog({
                    xyuseridxy: 'user123',
                    xyusernamexxy: 'fakeuser',
                    password: 'secret',
                });
                const fakeIdGenerator = () => '123'; // stub!
                const userRepositoryPostgres = new UserRepositoryPostgres(pool, fakeIdGenerator);

                // Action
                await userRepositoryPostgres.addLogBase(registerUserLog);

                // Assert
                const users = await UsersLogTableTestHelper.findUsersByIdlogbase('user123');
                expect(users).toHaveLength(1);
            });

        });
    });

    describe('getPasswordByUsername', () => {
        it('should throw InvariantError when user not found', () => {
            // Arrange
            const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});

            // Action & Assert
            return expect(userRepositoryPostgres.getPasswordByUsername('dicoding'))
                .rejects
                .toThrowError(InvariantError);
        });

        it('should return username password when user is found', async () => {
            // Arrange
            const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});
            await UsersLogTableTestHelper.addLogBase({
                username: 'dicoding',
                password: 'secret_password',
            });

            // Action & Assert
            const password = await userRepositoryPostgres.getPasswordByUsername('dicoding');
            expect(password).toBe('secret_password');
        });
    });

    describe('Getting data by username parameter', () => {
        it('should throw NotFoundError when user not found', async () => {
            // Arrange
            const userRepositoryPostgres = new UserRepositoryPostgres(pool);

            // Action & Assert
            await expect(userRepositoryPostgres.GetDataByUsername('dicoding3'))
                .rejects
                .toThrowError(NotFoundError);
        });

        it('should return data  correctly', async () => {
            // Arrange
            await UsersTableTestHelper.addUser({ xyusernamexxy: 'fakeuser333', xybanknamexyy: 'abc', xxybanknumberxy: '124454444' });
            const userRepositoryPostgres = new UserRepositoryPostgres(pool);

            // Action
            const databank = await userRepositoryPostgres.GetDataByUsername('fakeuser333');
            // Assert
            expect(databank).toEqual({ xyusernamexxy: 'fakeuser333', xybanknamexyy: 'abc', xybankuserxy: 'fake name', xxybanknumberxy: '124454444', group: 'groupbank1', groupwd: 'groupbankwd1', xyx11xuser_mailxxyy: 'user@gmail.com', xynumbphonexyyy: '58469874451', is_verified: false });
        });
    });

    describe('getIdByUsername', () => {
        it('should throw InvariantError when user not found', async () => {
            // Arrange
            const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});

            // Action & Assert
            await expect(userRepositoryPostgres.getIdByUsername('dicoding'))
                .rejects
                .toThrowError(InvariantError);
        });

        it('should return user id correctly', async () => {
            // Arrange
            await UsersLogTableTestHelper.addLogBase({ xyuseridxy: 'user-321', username: 'dicoding' });
            const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});

            // Action
            const userId = await userRepositoryPostgres.getIdByUsername('dicoding');
            // Assert
            expect(userId).toEqual('user-321');
        });
    });

    describe('getuitByUsername', () => {
        it('should throw InvariantError when user not found', async () => {
            // Arrange
            const userRepositoryPostgres = new UserRepositoryPostgres(pool);

            // Action & Assert
            await expect(userRepositoryPostgres.getDataBankByUsername('dicoding2'))
                .rejects
                .toThrowError(InvariantError);
        });

        it('should return user uit correctly', async () => {
            // Arrange
            await UsersTableTestHelper.addUser({ xyusernamexxy: 'fakeuser2222', xybanknamexyy: 'abc', xxybanknumberxy: '12445678' });
            const userRepositoryPostgres = new UserRepositoryPostgres(pool);

            // Action
            const databank = await userRepositoryPostgres.getDataBankByUsername('fakeuser2222');
            // Assert
            expect(databank).toEqual({ xybanknamexyy: 'abc', xybankuserxy: 'fake name', xxybanknumberxy: '12445678', group: 'groupbank1', groupwd: 'groupbankwd1', is_verified: false });
        });
    });

    describe('update data user', () => {

        it('should throw InvariantError when user not found', async () => {
            const params = {
                xyusernamexxy: '222fakeuser9898'

            }
            const updatedUser = new UpdateDataUser({
                xybanknamexyy: 'abc',
                xybankuserxy: 'fake name',
                xxybanknumberxy: '12345611',
                group: 'groupbank2',
                groupwd: 'groupbankwd2',
            });
            // Arrange
            const userRepositoryPostgres = new UserRepositoryPostgres(pool);

            // Action & Assert
            await expect(userRepositoryPostgres.UDataUser(updatedUser, params))
                .rejects
                .toThrowError(NotFoundError);
        });
        it('should update data user correctly', async () => {
            const params = {
                xyusernamexxy: 'fakeuser9898'

            }
            const updatedUser = new UpdateDataUser({
                xybanknamexyy: 'abc',
                xybankuserxy: 'fake name',
                xxybanknumberxy: '12345611',
                group: 'groupbank2',
                groupwd: 'groupbankwd2',
            });

            await UsersTableTestHelper.addUser({ xyusernamexxy: 'fakeuser9898', xybanknamexyy: 'abc', xxybanknumberxy: '124422222' });


            const userRepositoryPostgres = new UserRepositoryPostgres(pool);
            const UpdatedUser = await userRepositoryPostgres.UDataUser(updatedUser, params);
            expect(UpdatedUser).toStrictEqual("data berhasil di updated !");

        });

        describe('update data VIP user', () => {

            it('should throw InvariantError when user not found', async () => {
                const params = {
                    xyusernamexxy: '222fakeuser9898'

                }
                const updatedUser = {
                    is_verified: true
                };
                // Arrange
                const userRepositoryPostgres = new UserRepositoryPostgres(pool);

                // Action & Assert
                await expect(userRepositoryPostgres.Uvipuser(updatedUser, params))
                    .rejects
                    .toThrowError(NotFoundError);
            });
            it('should update data user correctly', async () => {
                const params = {
                    xyusernamexxy: 'fakeuser9898'

                }
                const updatedUser = {
                    is_verified: true

                };

                await UsersTableTestHelper.addUser({ xyusernamexxy: 'fakeuser9898', xybanknamexyy: 'abc', xxybanknumberxy: '124422222' });


                const userRepositoryPostgres = new UserRepositoryPostgres(pool);
                const UpdatedUser = await userRepositoryPostgres.Uvipuser(updatedUser, params);
                expect(UpdatedUser).toStrictEqual("data berhasil di updated !");

            });
        });

        describe('change password feature', () => {

            it('should throw InvariantError when user not found', async () => {
                const params = {
                    xyusernamexxy: 'fakeuser22187878'

                }
                const useCasePayload = new ChangePassw({
                    password: 'asdad123b',
                });
                // Arrange
                const userRepositoryPostgres = new UserRepositoryPostgres(pool);

                // Action & Assert
                await expect(userRepositoryPostgres.changepssw(useCasePayload, params))
                    .rejects
                    .toThrowError(InvariantError);
            });
            it("should change password correcttly and safely", async () => {
                const xyusernamexxy = 'fakeuser221';

                const restpas = "mockhaspassword";

                await UsersLogTableTestHelper.addLogBase({
                    username: 'fakeuser221',
                    password: 'asdad123a',
                });

                const userRepositoryPostgres = new UserRepositoryPostgres(pool);
                const updatedpass = await userRepositoryPostgres.changepssw(restpas, xyusernamexxy);

                expect(updatedpass).toStrictEqual("password berhasil diubah !");


            });
        });

    });
});
