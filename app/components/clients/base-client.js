import Component from "@ember/component";
import layout from "ember-graphql-examples/templates/components/clients/base-client";
import { assert } from "@ember/debug";

export default Component.extend({
  layout,
  tagName: "",

  init() {
    this._super(...arguments);
    assert("Must implement `clientName` property", this.get("clientName"));
  },

  async model() {
    assert("Must implment `model` hook");
  },

  async didInsertElement() {
    let model = await this.model();
    this.set("_model", model);
  },

  _model: null
});
