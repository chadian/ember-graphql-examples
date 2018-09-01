import Service from "@ember/service";
import { GraphQLClient } from "graphql-request";
import { inject as service } from "@ember/service";
import { computed } from "@ember/object";
import config from "ember-graphql-examples/config/environment";

export default Service.extend({
  session: service(),

  // unfortunately we have to generate a new instance each time,
  // unless the following PR gets merged:
  // https://github.com/prisma/graphql-request/pull/91
  client: computed("session.data.authenticated.access_token", function() {
    let token = this.get("session.data.authenticated.access_token");

    return new GraphQLClient(config.GRAPHQL_API_PATH, {
      headers: { Authorization: `Bearer ${token}` }
    });
  })
});
