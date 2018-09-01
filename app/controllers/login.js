import Controller from "@ember/controller";
import { inject as service } from "@ember/service";

export default Controller.extend({
  session: service(),

  actions: {
    login: function() {
      this.get("session")
        .authenticate(
          "authenticator:oauth2",
          "hardcodedUsername",
          "hardcodedPassword"
        )
        .then(() => this.transitionToRoute("application"));
    }
  }
});
