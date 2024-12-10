const pool = require('../../database/postgres/pool');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const UsersLogTableTestHelper = require('../../../../tests/UsersLogTableTestHelper');
const UsersEventTableTestHelper = require('../../../../tests/UsersEventTableTestHelper');
const UsersReffsTableTestHelper = require('../../../../tests/UsersReffsTableTestHelper');
const container = require('../../container');
const createServer = require('../createServer');

describe('/adduserendpoints', () => {
    afterAll(async () => {
        await pool.end();
    });

    afterEach(async () => {
        await UsersTableTestHelper.cleanTable();
        await UsersLogTableTestHelper.cleanTable();
        await UsersEventTableTestHelper.cleanTable();
        await UsersReffsTableTestHelper.cleanTable();
    });

    describe('WHEN POST /users', () => {

        it('should  throw an error 400 when payload is not valid', async () => {
            const requestPayload = {
                xyusernamexxy: 'fake user',
                password: 'secret',
                xybanknamexyy: 'abc',
                xybankuserxy: 'fake name',
                xxybanknumberxy: '12345678',
                xyx11xuser_mailxxyy: 'user@gmail.com',
                xynumbphonexyyy: '58469874451',
            };
            const server = await createServer(container);

            // Action
            const response = await server.inject({
                method: 'POST',
                url: '/users',
                payload: requestPayload,
                headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }

            });
            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(400);
            expect(responseJson.status).toEqual('fail');
            expect(responseJson.message).toEqual('register fail , input restricted !');
        });

        it('should response 201 and persisted user data', async () => {
            // Arrange
            const requestPayload = {
                xyusernamexxy: 'fakeuser',
                password: 'secret',
                xybanknamexyy: 'abc',
                xybankuserxy: 'fake name',
                xxybanknumberxy: '12345678',
                xyx11xuser_mailxxyy: 'user@gmail.com',
                xynumbphonexyyy: '58469874451',
            };

            // eslint-disable-next-line no-undef
            const server = await createServer(container);

            // Action
            const response = await server.inject({
                method: 'POST',
                url: '/users',
                payload: requestPayload,
                headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }

            });
            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(201);
            expect(responseJson.status).toEqual('success');
            expect(responseJson.data.addedUser).toBeDefined();
        });
    });

    describe('WHEN GET /users/{xxuserxx}', () => {

        it('should response 201 and persisted bank', async () => {

            const server = await createServer(container);
            const xxuserxx = 'fakeuser999';

            await UsersTableTestHelper.addUser({ xyuseridxy: 'user999', xyusernamexxy: 'fakeuser999', xybanknamexyy: 'abc', xxybanknumberxy: '124454445' });
            await UsersTableTestHelper.addUser({ xyuseridxy: 'user998', xyusernamexxy: 'fakeuser888', xybanknamexyy: 'abc', xxybanknumberxy: '124454443' });


            const response = await server.inject({
                method: 'GET',
                url: `/users/${xxuserxx}`,
                headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }


            })

            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(200);
            expect(responseJson.status).toEqual('success');
            expect(responseJson.data).toBeDefined();
        });


        it('should  throw an error 404 when payload is not found', async () => {
            const server = await createServer(container);

            const xxuserxx = 'fakeuser111';

            // Action
            const response = await server.inject({
                method: 'GET',
                url: `/users/${xxuserxx}`,
                headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }


            })
            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(404);
            expect(responseJson.status).toEqual('fail');
            expect(responseJson.message).toEqual('data not found !');
        });
    });

    describe('WHEN PUT /users/{xyusernamexxy}', () => {

        it('should response 201 whem change succesfully', async () => {

            const server = await createServer(container);
            const xyusernamexxy = 'fakeuser9911';
            ;


            const requestPayload = {
                xybanknamexyy: 'abc',
                xybankuserxy: 'fake name',
                xxybanknumberxy: '12345601',
                group: 'groupbank2',
                groupwd: 'groupbankwd2',
            };
            await UsersTableTestHelper.addUser({ xyuseridxy: 'user919', xyusernamexxy: 'fakeuser9911', xybanknamexyy: 'abc', xxybanknumberxy: '124004445' });


            const response = await server.inject({
                method: 'PUT',
                url: `/users/${xyusernamexxy}`,
                payload: requestPayload,
                headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }


            })

            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(200);
            expect(responseJson.status).toEqual('success');
            expect(responseJson.data).toBeDefined();
        });


        it('should  throw an error 404 when payload is not found', async () => {
            const server = await createServer(container);

            const xyusernamexxy = 'fakeuser9911656';
            const requestPayload = {
                xybanknamexyy: 'abc',
                xybankuserxy: 'fake name',
                xxybanknumberxy: '12345601',
                group: 'groupbank2',
                groupwd: 'groupbankwd2',
            };
            // Action
            const response = await server.inject({
                method: 'PUT',
                url: `/users/${xyusernamexxy}`,
                payload: requestPayload,
                headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }

            })
            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(404);
            expect(responseJson.status).toEqual('fail');
            expect(responseJson.message).toEqual('data not found !');
        });
    });

    describe('WHEN PUT /users/VIP/{xyusernamexxy}', () => {

        it('should response 201 whem change succesfully', async () => {

            const server = await createServer(container);
            const xyusernamexxy = 'fakeuser9911';
            ;


            const requestPayload = {
                is_verified: true
            };
            await UsersTableTestHelper.addUser({ xyuseridxy: 'user919', xyusernamexxy: 'fakeuser9911', xybanknamexyy: 'abc', xxybanknumberxy: '124004445' });


            const response = await server.inject({
                method: 'PUT',
                url: `/users/vip/${xyusernamexxy}`,
                payload: requestPayload,
                headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }


            })

            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(200);
            expect(responseJson.status).toEqual('success');
            expect(responseJson.data).toBeDefined();
        });


        it('should  throw an error 404 when payload is not found', async () => {
            const server = await createServer(container);

            const xyusernamexxy = 'fakeuser9911656';
            const requestPayload = {
                is_verified: true

            };
            // Action
            const response = await server.inject({
                method: 'PUT',
                url: `/users/vip/${xyusernamexxy}`,
                payload: requestPayload,
                headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }

            })
            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(404);
            expect(responseJson.status).toEqual('fail');
            expect(responseJson.message).toEqual('data not found !');
        });
    });

    describe('WHEN PUT PASSWORD FEATURES WORKS PERFECTLY', () => {
        it('should response 201 whem change password succesfully', async () => {

            const server = await createServer(container);
            const xyusernamexxy = 'fakeuser191';

            const requestPayload = {
                password: 'asdad123b',
            };
            await UsersLogTableTestHelper.addLogBase({
                username: 'fakeuser191', password: 'asdad123a'
            });

            const response = await server.inject({
                method: 'PUT',
                url: `/users/pswdy/${xyusernamexxy}`,
                payload: requestPayload,
                headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }


            })

            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(200);
            expect(responseJson.status).toEqual('success');
            expect(responseJson.data).toBeDefined();
        });

        it('should  throw an error 400 when payload is not solve', async () => {
            const server = await createServer(container);
            const xyusernamexxy = 'fakeuser1916556';

            const requestPayload = {
                password: 'asdad123b',
            };


            const response = await server.inject({
                method: 'PUT',
                url: `/users/pswdy/${xyusernamexxy}`,
                payload: requestPayload,
                headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }


            })
            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(400);
            expect(responseJson.status).toEqual('fail');
            expect(responseJson.message).toEqual('password gagal diubah !');
        });
    });


});