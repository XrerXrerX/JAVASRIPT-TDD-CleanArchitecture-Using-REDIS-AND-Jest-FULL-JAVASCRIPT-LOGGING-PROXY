const ApkHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'apks',
  register: async (server, { container }) => {
    const apkHandler = new ApkHandler(container);
    server.route(routes(apkHandler));
  },
};
