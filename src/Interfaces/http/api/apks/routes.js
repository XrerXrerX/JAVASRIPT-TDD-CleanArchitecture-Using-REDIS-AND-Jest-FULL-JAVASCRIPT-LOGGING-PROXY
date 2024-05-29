const routes = (handler) => ([
  {
    method: 'POST',
    path: '/apks/settings',
    handler: handler.postApkHandler,
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
    path: '/apks/settings/event',
    handler: handler.postApkEventHandler,
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
    path: '/apks/settings/notice',
    handler: handler.postApkNoticeHandler,
    options: {
      cors: {
<<<<<<< HEAD
        origin: ['https://bostoni.pro'],
      },
    },
  },
  //hanya pake auth
=======
        origin: ['*'],
      },
    },
  },
>>>>>>> aaf28ac1629362d7e0c504db6cc6a3a138f07f0b
  {
    method: 'GET',
    path: '/apks/settings/{apkid}',
    handler: handler.getApkHandler,
    options: {
      cors: {
        origin: ['*'],
      },
    },
  },
<<<<<<< HEAD
=======
  /** 
// Pre-handler method:
  {
    method: 'GET',
    path: '/',
    handler: (request, h) => {
        return `Hello, ${request.preparedData}!`;
    },
    options: {
        pre: [{ method: preHandlerMethod, assign: 'validate' }]
    }
  },

  //Post-handler method:
  {
   method: 'POST',
    path: '/',
    handler: (request, h) => {
        const response = h.response('Data created successfully');
        response.header('X-Custom-Header', 'value');
        return response;
    },
    options: {
        ext: {
            onPostHandler: {
                method: (request, h) => {
                    console.log('Post-handler method executed');
                    return h.continue;
                }
            }
        }
    }
  },

//Route authentication method:
  {
   method: 'GET',
    path: '/',
    handler: (request, h) => {
        return 'Authenticated route';
    },
    options: {
        auth: 'jwt'
    }
  },

  //Route validation method:
  {
    method: 'POST',
    path: '/',
    handler: (request, h) => {
        return 'Data posted successfully';
    },
    options: {
        validate: {
            payload: {
                username: Joi.string().required(),
                email: Joi.string().email().required()
            }
        }
    }
  },

  //Pre-response method:
  {
    method: 'GET',
    path: '/',
    handler: (request, h) => {
        return 'Response data';
    },
    options: {
        ext: {
            onPreResponse: {
                method: (request, h) => {
                    const response = request.response;
                    if (response.isBoom) {
                        response.output.payload.customMessage = 'An error occurred';
                    }
                    return h.continue;
                }
            }
        }
    }
  },
  */
>>>>>>> aaf28ac1629362d7e0c504db6cc6a3a138f07f0b
]);

module.exports = routes;
