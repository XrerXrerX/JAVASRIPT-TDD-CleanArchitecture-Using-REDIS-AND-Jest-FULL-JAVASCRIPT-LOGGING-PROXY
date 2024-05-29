const ContentHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'content',
  register: async (server, { container }) => {
    const contentHandler = new ContentHandler(container);
    server.route(routes(contentHandler));
  },
};
