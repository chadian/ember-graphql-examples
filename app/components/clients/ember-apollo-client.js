import Base from "./base-client";
import userQuery from "ember-graphql-examples/gql/queries/posts";

// important to use the appropriate mixin:
//
// RouteQueryManager
// ComponentQueryManager
// ObjectQueryManager
//
// , especially when using watchQuery, so that observed queries
// are torn down with appropriate lifecycle hooks
import { ComponentQueryManager } from "ember-apollo-client";

export default Base.extend(ComponentQueryManager, {
  clientName: "ember-apollo-client",

  model() {
    return this.get("apollo").query({ query: userQuery }, "allPosts");
  }
});
