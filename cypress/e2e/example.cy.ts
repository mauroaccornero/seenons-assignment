// https://docs.cypress.io/api/introduction/api.html

describe("Stop detail test", () => {
  it("visits the stop detail page", () => {
    cy.visit("/stop/1");
    cy.contains("h1", "You did it!");
  });
});
