describe('Navigation', () => {
  it('should navigate to the recommend page', () => {
    cy.visit('/');

    cy.contains('Recommend').click();

    cy.url().should('include', '/recommend');
    cy.contains('Recommendations');
  });
});
