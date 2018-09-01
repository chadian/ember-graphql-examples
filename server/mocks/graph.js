/* eslint-env node */
'use strict';

let users = require('../data/users');
let { posts } = require('../data/posts');

let data = { users, posts };

module.exports = function(app) {
  let jsonGraphqlExpress = require('json-graphql-server').default;
  app.use('/api/graph', jsonGraphqlExpress(data));
};
