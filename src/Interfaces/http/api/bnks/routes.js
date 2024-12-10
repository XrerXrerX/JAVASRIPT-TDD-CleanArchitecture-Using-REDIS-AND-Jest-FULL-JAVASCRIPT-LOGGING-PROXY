const routes = (handler) => ([

  {
    method: 'POST',
    path: '/banks/group',
    handler: handler.postGroupHandler,
    options: {
      cors: {
        origin: ['https://bostoni.pro'],
      },
    },
  },
  {
    method: 'GET',
    path: '/banks/group',
    handler: handler.getGroupHandler,
    options: {
      cors: {
        origin: ['*'],
      },
    },
  },
  {
    method: 'PUT',
    path: '/banks/group/{namegroup}',
    handler: handler.putGroupHandler,
    options: {
      cors: {
        origin: ['https://bostoni.pro'],
      },
    },
  },
  {
    method: 'DELETE',
    path: '/banks/group/{idgroup}',
    handler: handler.delGroupHandler,
    options: {
      cors: {
        origin: ['https://bostoni.pro'],
      },
    },
  },
  {
    method: 'POST',
    path: '/banks/master',
    handler: handler.postMasterHandler,
    options: {
      cors: {
        origin: ['https://bostoni.pro'],
      },
    },
  },
  {
    method: 'PUT',
    path: '/banks/master/{mstrbnks}',
    handler: handler.putMasterHandler,
    options: {
      cors: {
        origin: ['https://bostoni.pro'],
      },
    },
  },

  {
    method: 'GET',
    path: '/banks/master',
    handler: handler.getMasterHandler,
    options: {
      cors: {
        origin: ['*'],
      },
    },
  },
  {
    method: 'DELETE',
    path: '/banks/master/{idbnkmaster}',
    handler: handler.delMasterHandler,
    options: {
      cors: {
        origin: ['https://bostoni.pro'],
      },
    },
  },
  {
    method: 'POST',
    path: '/banks/v2/add',
    handler: handler.postBanknwHandler,
    options: {
      cors: {
        origin: ['https://bostoni.pro'],
      },
    },
  },
  {
    method: 'PUT',
    path: '/banks/v2/{idbank}/{nmbank}',
    handler: handler.putBanknwHandler,
    options: {
      cors: {
        origin: ['https://bostoni.pro'],
      },
    },
  },
  {
    method: 'PUT',
    path: '/banks/v3/{idbank}',
    handler: handler.putGroupBanknwHandler,
    options: {
      cors: {
        origin: ['https://bostoni.pro'],
      },
    },
  },
  {
    method: 'GET',
    path: '/banks/v2/{groupname}',
    handler: handler.getBanknwHandler,
    options: {
      cors: {
        origin: ['*'],
      },
    },
  },
  {
    method: 'GET',
    path: '/banks/exc/{groupname}',
    handler: handler.getBanknwexHandler,
    options: {
      cors: {
        origin: ['*'],
      },
    },
  },
  {
    method: 'DELETE',
    path: '/banks/{idbank}/{namabank}',
    handler: handler.delBankHandler,
    options: {
      cors: {
        origin: ['https://bostoni.pro'],
      },
    },
  },
  {
    method: 'DELETE',
    path: '/banks/arr/{idbank}/{groupbank}',
    handler: handler.delArrBankHandler,
    options: {
      cors: {
        origin: ['https://bostoni.pro'],
      },
    },
  },
]);

module.exports = routes;
