import Service from "@ember/service";
import { Lokka } from "lokka";
import { Transport } from "lokka-transport-http";
import { inject as service } from "@ember/service";
import { computed } from "@ember/object";
import config from "ember-graphql-examples/config/environment";

export default Service.extend({
  session: service(),

  client: computed("session.data.authenticated.access_token", function() {
    let token = this.get("session.data.authenticated.access_token");

    // unfortunately we have to generate a new instance every time
    // https://github.com/kadirahq/lokka-transport-http/issues/24
    return new Lokka({
      transport: new Transport(config.GRAPHQL_API_PATH, {
        credentials: false,
        headers: { Authorization: `Bearer ${token}` }
      })
    });
  })
});
