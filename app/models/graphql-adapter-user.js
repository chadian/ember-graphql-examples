import DS from "ember-data";

export default DS.Model.extend({
  name: DS.attr("string"),
  image: DS.attr("string"),
  Posts: DS.hasMany("graphql-adapter-post", { async: false })
});
