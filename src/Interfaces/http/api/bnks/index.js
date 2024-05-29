const BnksHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'banks',
  register: async (server, { container }) => {
    const banksHandler = new BnksHandler(container);
    server.route(routes(banksHandler));
  },
};
