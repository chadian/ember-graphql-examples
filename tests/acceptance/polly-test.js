import { module, test } from "qunit";
import { visit } from "@ember/test-helpers";
import { setupQunit as setupPolly } from "@pollyjs/core";
import { setupApplicationTest } from "ember-qunit";
import { authenticateSession } from "ember-simple-auth/test-support";

module("Acceptance | polly", function(hooks) {
  setupApplicationTest(hooks);
  hooks.beforeEach(() => authenticateSession());
  setupPolly(hooks);

  test("it has the same first post for each client", async function(assert) {
    await authenticateSession();
    await visit("/");

    document
      .querySelectorAll(".client-outlet .post:first-child")
      .forEach(firstPost => {
        assert.equal(
          firstPost.querySelector(".content").textContent.trim(),
          "So excited to welcome everyone to this year's #emberfest. I hope you love Amsterdam!"
        );

        assert.equal(
          firstPost.querySelector(".user-name").textContent.trim(),
          "Amsterdam Tomster"
        );

        assert.equal(
          firstPost.querySelector(".date").textContent.trim(),
          "on October 11, 2018"
        );
      });
  });
});
