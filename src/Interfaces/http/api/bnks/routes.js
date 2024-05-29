const routes = (handler) => ([

  {
    method: 'POST',
    path: '/banks/group',
    handler: handler.postGroupHandler,
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
<<<<<<< HEAD
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
=======
>>>>>>> aaf28ac1629362d7e0c504db6cc6a3a138f07f0b
    method: 'DELETE',
    path: '/banks/group/{idgroup}',
    handler: handler.delGroupHandler,
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
  {
    method: 'POST',
    path: '/banks/master',
    handler: handler.postMasterHandler,
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
  {
    method: 'PUT',
    path: '/banks/master/{mstrbnks}',
    handler: handler.putMasterHandler,
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
<<<<<<< HEAD
        origin: ['https://bostoni.pro'],
=======
        origin: ['*'],
>>>>>>> aaf28ac1629362d7e0c504db6cc6a3a138f07f0b
      },
    },
  },
  {
    method: 'POST',
<<<<<<< HEAD
    path: '/banks/v2/add',
    handler: handler.postBanknwHandler,
    options: {
      cors: {
        origin: ['https://bostoni.pro'],
=======
    path: '/banks/v2',
    handler: handler.postBanknwHandler,
    options: {
      cors: {
        origin: ['*'],
>>>>>>> aaf28ac1629362d7e0c504db6cc6a3a138f07f0b
      },
    },
  },
  {
    method: 'PUT',
<<<<<<< HEAD
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
=======
    path: '/banks/v2/{idbank}',
    handler: handler.putBanknwHandler,
    options: {
      cors: {
        origin: ['*'],
>>>>>>> aaf28ac1629362d7e0c504db6cc6a3a138f07f0b
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
<<<<<<< HEAD
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
=======
  }
  // ,
  // {
  //   method: 'POST',
  //   path: '/banks',
  //   handler: handler.postBanksHandler,
  //   options: {
  //     cors: {
  //       origin: ['*'],
  //     },
  //   },
  // },
  // {
  //   method: 'GET',
  //   path: '/banks/{groupname}',
  //   handler: handler.getBanksHandler,
  //   options: {
  //     cors: {
  //       origin: ['*'],
  //     },
  //   },
  // },
>>>>>>> aaf28ac1629362d7e0c504db6cc6a3a138f07f0b
]);

module.exports = routes;
