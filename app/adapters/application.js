import GraphQLAdapter from "ember-graphql-adapter";
import { computed } from "@ember/object";
import { inject as service } from "@ember/service";
import { pluralize } from "ember-inflector";
import { camelize } from "@ember/string";
import config from "ember-graphql-examples/config/environment";

export default GraphQLAdapter.extend({
  session: service(),

  endpoint: config.GRAPHQL_API_PATH,
  httpMethod: "POST",

  headers: computed("session.isAuthenticated", function() {
    let token = this.get("session.data.authenticated.access_token");
    return { Authorization: `Bearer ${token}` };
  }),

  ajaxOptions(data) {
    let options = this._super(data);
    options.contentType = "application/json; charset=utf-8";
    options.data = JSON.stringify(options.data);
    return options;
  },

  request(store, type, options) {
    // hack: expected `all` prefixed queries by backend don't work
    // by convention with the model name, so the appropriate convention
    // is swapped.
    let queryType = type.modelName.replace("graphql-adapter-", "");
    let operationName = camelize("all-" + pluralize(queryType));

    // override model's mapping to graphql query type
    options.operationName = operationName;
    options.rootFieldName = operationName;
    return this._super(store, type, options);
  },

  compile() {
    let result = this._super(...arguments);

    // hack: to normalize the query based on the given types
    // expects an uppercase form
    result = result.replace("user", "User");
    result = result.replace("posts", "Posts");

    return result;
  }
});
