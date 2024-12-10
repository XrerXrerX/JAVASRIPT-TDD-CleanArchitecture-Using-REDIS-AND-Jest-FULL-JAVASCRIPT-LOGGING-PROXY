const ProxyHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'proxy',
  register: async (server, { container }) => {
    const prxyHandler = new ProxyHandler(container);
    server.route(routes(prxyHandler));
  },
};
