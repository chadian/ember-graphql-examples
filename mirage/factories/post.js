import { Factory /*, faker*/ } from "ember-cli-mirage";

export default Factory.extend({
  post: 'This is a fantastic post coming from ember-cli-mirage',
  date: 'October 8, 2018',
  source: 'http://test-source',
});
