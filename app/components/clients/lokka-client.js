import Base from "./base-client";
import userQueryAsString from "ember-graphql-examples/gql/queries/posts-query-as-string";
import { inject as service } from "@ember/service";

export default Base.extend({
  clientName: "lokka",
  lokka: service(),

  model() {
    return this.get("lokka.client")
      .query(userQueryAsString)
      .then(data => data.allPosts);
  }
});
