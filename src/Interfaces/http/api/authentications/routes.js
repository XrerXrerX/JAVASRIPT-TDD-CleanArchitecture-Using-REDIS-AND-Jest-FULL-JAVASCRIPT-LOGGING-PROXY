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
<<<<<<< HEAD
      auth: 'dashbljwt',
=======
>>>>>>> aaf28ac1629362d7e0c504db6cc6a3a138f07f0b
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
<<<<<<< HEAD
      auth: 'dashbljwt',
    },

=======
    },
>>>>>>> aaf28ac1629362d7e0c504db6cc6a3a138f07f0b
  },
  {
    method: 'DELETE',
    path: '/authentications',
    handler: handler.deleteAuthenticationHandler,
    options: {
      cors: {
        origin: ['*'],
      },
<<<<<<< HEAD
      auth: 'dashbljwt',
=======
>>>>>>> aaf28ac1629362d7e0c504db6cc6a3a138f07f0b
    },
  },
]);

module.exports = routes;
