import { Serializer } from "ember-graphql-adapter";
import { singularize } from "ember-inflector";
import { camelize } from "@ember/string";

export default Serializer.extend({
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    // hack: swap `all` root queries for appropriate ember data model name
    for (let key in payload.data) {
      let baseModelKey = key.replace("all", "");
      payload.data[camelize("graphql-adapter-" + singularize(baseModelKey))] =
        payload.data[key];
      delete payload.data[key];
    }

    return this._super(store, primaryModelClass, payload, id, requestType);
  },

  extractRelationships(modelClass, resourceHash) {
    // hack: force relationships into normalized key names
    // for ember data
    recursiveCamelize(resourceHash);
    return this._super(modelClass, resourceHash);
  }
});

// recursively camelize any keys that point to
// an object or an array, assuming that they should
// so they can be loaded properly as relationships
function recursiveCamelize(obj) {
  for (let key in obj) {
    if (Array.isArray(obj[key])) {
      obj[camelize(key)] = obj.key;
      obj[key].forEach(item => recursiveCamelize(item));
      delete obj[key];
    } else if (typeof obj[key] === "object") {
      recursiveCamelize(obj[key]);
      obj[camelize(key)] = obj[key];
      delete obj[key];
    }
  }
}
