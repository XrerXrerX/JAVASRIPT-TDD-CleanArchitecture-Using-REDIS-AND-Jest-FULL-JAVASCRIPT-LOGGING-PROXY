const pool = require('../../database/postgres/pool');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const AuthenticationsTableTestHelper = require('../../../../tests/AuthenticationsTableTestHelper');
const UsersLogTableTestHelper = require('../../../../tests/UsersLogTableTestHelper');

const container = require('../../container');
const createServer = require('../createServer');
const AuthenticationTokenManager = require('../../../Applications/security/AuthenticationTokenManager');

describe('/authentications endpoint', () => {
  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
    await AuthenticationsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
    await UsersLogTableTestHelper.cleanTable();
  });

  describe('when POST /authentications', () => {
    it('should response 201 and new authentication', async () => {
      // Arrange
      const requestPayload = {
        username: 'fakeuser',
        password: 'secret',
      };
      const server = await createServer(container);
      // add user
      await server.inject({
        method: 'POST',
        url: '/users',
        payload: {
          xyusernamexxy: 'fakeuser',
          password: 'secret',
          xybanknamexyy: 'abc',
          xybankuserxy: 'fake name',
          xxybanknumberxy: '12345678',
          xyx11xuser_mailxxyy: 'user@gmail.com',
          xynumbphonexyyy: '58469874451',
        },
      });

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: requestPayload,
        headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }

      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.accessToken).toBeDefined();
      expect(responseJson.data.refreshToken).toBeDefined();
    });
  });

  describe('when PUT /authentications', () => {
    it('should return 200 and new access token', async () => {
      // Arrange
      const server = await createServer(container);
      // const refreshToken = await container.getInstance(AuthenticationTokenManager.name).createRefreshToken({ username: 'dicoding' });

      // add user
      await server.inject({
        method: 'POST',
        url: '/users',
        payload: {
          xyusernamexxy: 'fakeuser',
          password: 'secret',
          xybanknamexyy: 'abc',
          xybankuserxy: 'fake name',
          xxybanknumberxy: '12345678',
          xyx11xuser_mailxxyy: 'user@gmail.com',
          xynumbphonexyyy: '58469874451',
        },
      });
      // login user
      const loginResponse = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: {
          username: 'fakeuser',
          password: 'secret',
        },
        headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }

      });
      const { data: { refreshToken } } = JSON.parse(loginResponse.payload);
      const accessToken = await container.getInstance(AuthenticationTokenManager.name).createAccessToken({ username: 'fakeuser' });

      // Action
      const response = await server.inject({
        method: 'PUT',
        url: '/authentications',
        payload: {
          refreshToken,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE
        },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.accessToken).toBeDefined();
      expect(responseJson.data.refreshTokennew).toBeDefined();
      expect(responseJson.data.apkToken).toBeDefined();
    });

    it('should return 400 payload not contain refresh token', async () => {
      // Arrange
      const server = await createServer(container);
      const accessToken = await container.getInstance(AuthenticationTokenManager.name).createAccessToken({ username: 'dicoding' });

      // Action
      const response = await server.inject({
        method: 'PUT',
        url: '/authentications',
        payload: {},
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE
        },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('harus mengirimkan token refresh');
    });

    it('should return 400 if refresh token not string', async () => {
      // Arrange
      const server = await createServer(container);

      const accessToken = await container.getInstance(AuthenticationTokenManager.name).createAccessToken({ username: 'dicoding' });


      // Action
      const response = await server.inject({
        method: 'PUT',
        url: '/authentications',
        payload: {
          refreshToken: 123,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE
        },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('refresh token harus string');
    });

    it('should return 400 if refresh token not valid', async () => {
      // Arrange
      const server = await createServer(container);
      const accessToken = await container.getInstance(AuthenticationTokenManager.name).createAccessToken({ username: 'dicoding' });

      // Action
      const response = await server.inject({
        method: 'PUT',
        url: '/authentications',
        payload: {
          refreshToken: 'invalid_refresh_token',
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('refresh token tidak valid');
    });

    it('should return 400 if refresh token not registered in database', async () => {
      // Arrange
      const server = await createServer(container);

      const accessToken = await container.getInstance(AuthenticationTokenManager.name).createAccessToken({ username: 'dicoding' });

      const refreshToken = await container.getInstance(AuthenticationTokenManager.name).createRefreshToken({ username: 'dicoding' });

      // Action
      const response = await server.inject({
        method: 'PUT',
        url: '/authentications',
        payload: {
          refreshToken,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('refresh token tidak ditemukan di database');
    });
  });

  describe('when DELETE /authentications', () => {
    it('should response 200 if refresh token valid', async () => {
      // Arrange
      const server = await createServer(container);
      const refreshToken = 'refresh_token';
      const accessToken = await container.getInstance(AuthenticationTokenManager.name).createAccessToken({ username: 'dicoding' });

      await AuthenticationsTableTestHelper.addToken(refreshToken);

      // Action
      const response = await server.inject({
        method: 'DELETE',
        url: '/authentications',
        payload: {
          refreshToken,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
    });

    it('should response 400 if refresh token not registered in database', async () => {
      // Arrange
      const server = await createServer(container);
      const refreshToken = 'refresh_token';
      const accessToken = await container.getInstance(AuthenticationTokenManager.name).createAccessToken({ username: 'dicoding' });

      // Action
      const response = await server.inject({
        method: 'DELETE',
        url: '/authentications',
        payload: {
          refreshToken,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('refresh token tidak ditemukan di database');
    });

    it('should response 400 if payload not contain refresh token', async () => {
      // Arrange
      const server = await createServer(container);
      const accessToken = await container.getInstance(AuthenticationTokenManager.name).createAccessToken({ username: 'dicoding' });

      // Action
      const response = await server.inject({
        method: 'DELETE',
        url: '/authentications',
        payload: {},
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE
        },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('harus mengirimkan token refresh');
    });

    it('should response 400 if refresh token not string', async () => {
      // Arrange
      const server = await createServer(container);
      const accessToken = await container.getInstance(AuthenticationTokenManager.name).createAccessToken({ username: 'dicoding' });

      // Action
      const response = await server.inject({
        method: 'DELETE',
        url: '/authentications',
        payload: {
          refreshToken: 123,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE
        },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('refresh token harus string');
    });
  });

  describe(' when get data decode response', () => {
    it('should response 200 if get data success send data username and IAT', async () => {

      // Arrange
      const server = await createServer(container);
      const accessToken = await container.getInstance(AuthenticationTokenManager.name).createAccessToken({ username: 'dicoding' });

      // add user
      await server.inject({
        method: 'POST',
        url: '/users',
        payload: {
          xyusernamexxy: 'fakeuser2',
          password: 'secret',
          xybanknamexyy: 'abc',
          xybankuserxy: 'fake name',
          xxybanknumberxy: '12345641',
          xyx11xuser_mailxxyy: 'user22@gmail.com',
          xynumbphonexyyy: '58469874451',
        },
      });
      // login user
      const loginResponse = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: {
          username: 'fakeuser2',
          password: 'secret',
        },
        headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }

      });
      const { data: { refreshToken } } = JSON.parse(loginResponse.payload);
      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/authentications/datauser',
        payload: { refreshToken },
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE
        },
      });
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
    });
  });
});
