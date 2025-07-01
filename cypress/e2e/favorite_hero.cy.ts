describe("Favoritar um herói pesquisando por 'spider'", () => {
  it("Deve buscar, selecionar e favoritar o primeiro herói da lista", () => {
    // Acessa a home
    cy.visit("/");

    cy.get('input[type="text"]').type("spider{enter}");

    cy.get('[data-cy="hero-card"]', { timeout: 8000 }).should(
      "have.length.greaterThan",
      0
    );

    cy.get('[data-cy="hero-card"]').first().click();

    cy.get('[data-cy="favorite-button"]').click();

    cy.get('[data-cy="favorite-button"]')
      .should("have.attr", "src")
      .and("include", "Path.svg");
  });
});
