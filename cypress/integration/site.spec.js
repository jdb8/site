/* global cy */

describe('joebateson.com', function () {
  it('passes smoketest', function () {
    cy.visit('/');
  });

  it('passes a11y audits', () => {
    cy.visit('/');
    cy.injectAxe();
    cy.wait(500);
    cy.checkA11y();
  });
});
