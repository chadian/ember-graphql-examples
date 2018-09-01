import Pretender from "pretender";
import { graphql, buildASTSchema } from "graphql";
import { addMockFunctionsToSchema } from "graphql-tools";
import introspectionResult from "ember-graphql-examples/gql/schema";
import config from "ember-graphql-examples/config/environment";

// For more information on mocking using `graphql-tools`
// https://www.apollographql.com/docs/graphql-tools/mocking.html

let schema = buildASTSchema(introspectionResult);
let mocks = {
  Query: () => ({
    allPosts() {
      // return a single post for the mocked
      // `allPosts` query
      return [mocks.Post()];
    }
  }),

  User: () => ({
    id: "0",
    tags: ["test-tag"],
    url: "http://test-url",
    name: "Mock User",
    created: "October 1, 2018",
    posts: [{ __typename: "Post" }]
  }),

  Post: () => ({
    id: "0",
    post: "This is a mock post coming from the mock resolvers",
    date: "October 2, 2018",
    source: "http://test-source",
    User: { __typename: "User" }
  })
};

addMockFunctionsToSchema({ schema, mocks });

export default function setupMockResolvers(hooks) {
  let server;

  hooks.beforeEach(() => {
    server = new Pretender(function() {
      this.post(config.GRAPHQL_API_PATH, async request => {
        let { query } = JSON.parse(request.requestBody);
        let result = JSON.stringify(await graphql(schema, query));

        /* eslint-disable no-console */
        console.info("Mock resolvers, query:", query);
        console.info("Mock resolvers, result:", result);
        /* eslint-enable no-console */

        return [200, { "Content-Type": "application/json" }, result];
      });
    });
  });

  hooks.afterEach(() => server.shutdown());
}
