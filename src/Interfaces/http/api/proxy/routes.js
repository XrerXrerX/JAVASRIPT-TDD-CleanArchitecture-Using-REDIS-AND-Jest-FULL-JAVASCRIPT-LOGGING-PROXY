/** @format */

const routes = (handler) => [
  {
    method: "POST",
    path: "/prx/history/log", // Route untuk proxy
    options: {
      cors: {
        origin: ["*"],
      },
      auth: "dashbljwt",
    },
    handler: {
      proxy: {
        uri: "https://example.pro/api/historylog", // URL target proxy
        passThrough: true, // Mengizinkan respons dari endpoint ditransfer langsung ke klien
      },
    },
  },
  {
    method: "POST",
    path: "/prx/register", // Route untuk proxy
    options: {
      cors: {
        origin: ["*"],
      },
      // auth: 'dashbljwt',
    },
    handler: {
      proxy: {
        uri: "https://example.pro/api/register", // URL target proxy
        passThrough: true, // Mengizinkan respons dari endpoint ditransfer langsung ke klien
      },
    },
  },
];

module.exports = routes;
