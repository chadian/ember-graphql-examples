import ApolloService from "ember-apollo-client/services/apollo";
import { setContext } from "apollo-link-context";
import { computed } from "@ember/object";
import { inject as service } from "@ember/service";

export default ApolloService.extend({
  session: service(),

  link: computed(function() {
    let link = this._super(...arguments);
    let session = this.get("session");

    let authLink = setContext(() => {
      if (!session.get("isAuthenticated")) {
        return link;
      }

      let accessToken = session.get("data.authenticated.access_token");
      return {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      };
    });

    return authLink.concat(link);
  })
});
