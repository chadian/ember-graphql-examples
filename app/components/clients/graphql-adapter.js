import Base from "./base-client";
import { inject as service } from "@ember/service";

export default Base.extend({
  clientName: "graphql-adapter",
  store: service(),

  model() {
    return this.store.findAll("graphql-adapter-post");
  }
});
