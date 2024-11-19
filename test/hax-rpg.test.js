import { html, fixture, expect } from '@open-wc/testing';
import "../hax-rpg.js";

describe("HaxRpg test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <hax-rpg
        title="title"
      ></hax-rpg>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
