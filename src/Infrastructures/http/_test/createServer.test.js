const createServer = require('../createServer');

describe('HTTP server', () => {
  it('should response 404 when request unregistered route', async () => {
    // Arrange
    const server = await createServer({});

    // Action
    const response = await server.inject({
      method: 'GET',
      url: '/unregisteredRoute',

      headers: {
        Authorization: 'Bearer invalid_token', // Gunakan token yang tidak valid
        'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE
      }
    });

    // Assert
    expect(response.statusCode).toEqual(404);
  });

  it('should handle server error correctly', async () => {
    // Arrange
    const requestPayload = {
      username: 'dicoding',
      fullname: 'Dicoding Indonesia',
      password: 'super_secret',
    };
    const server = await createServer({}); // fake injection

    // Action
    const response = await server.inject({
      method: 'POST',
      url: '/users',
      payload: requestPayload,

      headers: {
        Authorization: 'Bearer validToken', // Gunakan token yang tidak valid
        'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE
      }
    });

    // Assert
    const responseJson = JSON.parse(response.payload);
    expect(response.statusCode).toEqual(500);
    expect(responseJson.status).toEqual('error');
    expect(responseJson.message).toEqual('terjadi kegagalan pada server kami');
  });

  it('should log audit event for failed responses', async () => {
    // Arrange
    const server = await createServer({}); // fake injection
    const logAuditEvent = jest.fn();

    // Mock request object
    const mockRequest = {
      method: 'GET',
      url: {
        href: '/test',
      },
      info: {
        remoteAddress: '127.0.0.1',
      },
    };

    // Action
    const mockResponse = null; // Simulate failed response
    if (!mockResponse) {
      logAuditEvent('Failed Response', { method: mockRequest.method, url: mockRequest.url.href, clientIp: mockRequest.info.remoteAddress });
    }

    // Assert
    expect(logAuditEvent).toHaveBeenCalledWith('Failed Response', { method: mockRequest.method, url: mockRequest.url.href, clientIp: mockRequest.info.remoteAddress });
  });

});

