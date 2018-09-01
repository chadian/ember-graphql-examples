import DS from "ember-data";

export default DS.Model.extend({
  post: DS.attr("string"),
  date: DS.attr("string"),
  source: DS.attr("string"),
  User: DS.belongsTo("graphql-adapter-user", { async: false })
});
