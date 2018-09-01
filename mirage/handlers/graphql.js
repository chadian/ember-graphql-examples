import createGraphQLHandler from 'ember-cli-mirage-graphql/handler';
import schema from 'ember-graphql-examples/gql/schema';

/* eslint-disable no-unused-vars*/
// There's currently an issue with `ember-cli-graphql-mirage`
// where these dependencies are failing to be loaded.
// It likely just needs to be configured for `ember-cli-auto-import`
import graphqlTools from "graphql-tools";
import graphql from "graphql";
/* eslint-enable no-unused-vars*/

export default createGraphQLHandler(schema);
