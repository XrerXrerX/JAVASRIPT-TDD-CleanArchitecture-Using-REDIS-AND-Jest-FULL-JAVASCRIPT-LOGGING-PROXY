const routes = (handler) => ([
  {
    method: 'POST',
    path: '/users',
    handler: handler.postUserHandler,
    options: {
      cors: {
        origin: ['*'],
      },
    },
  },
<<<<<<< HEAD
  //cors backend +access token
=======
>>>>>>> aaf28ac1629362d7e0c504db6cc6a3a138f07f0b
  {
    method: 'GET',
    path: '/users/{xxuserxx}',
    handler: handler.getUserHandler,
    options: {
      cors: {
        origin: ['*'],
      },
    },
  },
<<<<<<< HEAD
  //cors backend +access token
=======
>>>>>>> aaf28ac1629362d7e0c504db6cc6a3a138f07f0b
  {
    method: 'PUT',
    path: '/users/{xyusernamexxy}',
    handler: handler.putUserHandler,
    options: {
      cors: {
<<<<<<< HEAD
        origin: ['https://bostoni.pro'],
      },
    },
  },
  //cors backend +access token
=======
        origin: ['*'],
      },
    },
  },
>>>>>>> aaf28ac1629362d7e0c504db6cc6a3a138f07f0b
  {
    method: 'PUT',
    path: '/users/vip/{xyusernamexxy}',
    handler: handler.putUserVIPHandler,
    options: {
      cors: {
<<<<<<< HEAD
        origin: ['https://bostoni.pro'],
      },

    },
  },
  //cors backend +access token

=======
        origin: ['*'],
      },
    },
  },
>>>>>>> aaf28ac1629362d7e0c504db6cc6a3a138f07f0b
  {
    method: 'PUT',
    path: '/users/pswdy/{xyusernamexxy}',
    handler: handler.putPassHandler,
    options: {
      cors: {
<<<<<<< HEAD
        origin: ['https://bostoni.pro'],
=======
        origin: ['*'],
>>>>>>> aaf28ac1629362d7e0c504db6cc6a3a138f07f0b
      },
    },
  },
]);

module.exports = routes;
