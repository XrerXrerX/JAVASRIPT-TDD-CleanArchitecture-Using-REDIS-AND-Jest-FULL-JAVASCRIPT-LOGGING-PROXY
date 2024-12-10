const MemoHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'memo',
  register: async (server, { container }) => {
    const memoHandler = new MemoHandler(container);
    server.route(routes(memoHandler));
  },
};
