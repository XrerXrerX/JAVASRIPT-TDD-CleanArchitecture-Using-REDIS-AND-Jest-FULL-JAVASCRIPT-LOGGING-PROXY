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
  //cors backend +access token
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
  //cors backend +access token
  {
    method: 'PUT',
    path: '/users/{xyusernamexxy}',
    handler: handler.putUserHandler,
    options: {
      cors: {
        origin: ['https://bostoni.pro'],
      },
    },
  },
  //cors backend +access token
  {
    method: 'PUT',
    path: '/users/vip/{xyusernamexxy}',
    handler: handler.putUserVIPHandler,
    options: {
      cors: {
        origin: ['https://bostoni.pro'],
      },

    },
  },
  //cors backend +access token

  {
    method: 'PUT',
    path: '/users/pswdy/{xyusernamexxy}',
    handler: handler.putPassHandler,
    options: {
      cors: {
        origin: ['https://bostoni.pro'],
      },
    },
  },
]);

module.exports = routes;
