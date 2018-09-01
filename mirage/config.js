import graphQLHandler from "./handlers/graphql";

export default function() {
  this.logging = true;
  this.namespace = "/api/";
  this.post("/graph/", graphQLHandler, 200);
}
