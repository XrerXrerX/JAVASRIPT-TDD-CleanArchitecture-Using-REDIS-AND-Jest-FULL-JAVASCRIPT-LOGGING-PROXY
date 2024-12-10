const routes = (handler) => ([
  {
    method: 'POST',
    path: '/authentications',
    handler: handler.postAuthenticationHandler,
    options: {
      cors: {
        origin: ['*'],
      },
    },
  },
  {
    method: 'POST',
    path: '/authentications/datauser',
    handler: handler.postAuthenticationdataHandler,
    options: {
      cors: {
        origin: ['*'],
      },
      auth: 'dashbljwt',
    },
  },
  {
    method: 'PUT',
    path: '/authentications',
    handler: handler.putAuthenticationHandler,
    options: {
      cors: {
        origin: ['*'],
      },
      auth: 'dashbljwt',
    },

  },
  {
    method: 'DELETE',
    path: '/authentications',
    handler: handler.deleteAuthenticationHandler,
    options: {
      cors: {
        origin: ['*'],
      },
      auth: 'dashbljwt',
    },
  },
]);

module.exports = routes;
