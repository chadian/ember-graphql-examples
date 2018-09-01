import Base from "./base-client";
import { inject as service } from "@ember/service";
import userQueryAsString from "ember-graphql-examples/gql/queries/posts-query-as-string";

export default Base.extend({
  clientName: "graphql-request",
  ["graphql-request"]: service(),

  model() {
    return this.get("graphql-request.client")
      .request(userQueryAsString)
      .then(data => data.allPosts);
  }
});
