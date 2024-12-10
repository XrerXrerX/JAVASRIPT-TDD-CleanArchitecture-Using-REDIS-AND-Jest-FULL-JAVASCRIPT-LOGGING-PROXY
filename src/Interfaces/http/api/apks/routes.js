const routes = (handler) => ([
  {
    method: 'POST',
    path: '/apks/settings',
    handler: handler.postApkHandler,
    options: {
      cors: {
        origin: ['https://bostoni.pro'],
      },
    },
  },
  {
    method: 'POST',
    path: '/apks/settings/event',
    handler: handler.postApkEventHandler,
    options: {
      cors: {
        origin: ['https://bostoni.pro'],
      },
    },
  },
  {
    method: 'POST',
    path: '/apks/settings/notice',
    handler: handler.postApkNoticeHandler,
    options: {
      cors: {
        origin: ['https://bostoni.pro'],
      },
    },
  },
  //hanya pake auth
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
]);

module.exports = routes;
