describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.contains('MarketplaceUi');
    cy.contains('Akros Marketplace');
  });
});
