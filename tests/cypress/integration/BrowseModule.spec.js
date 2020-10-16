/// <reference types="cypress" />

context('BrowseModule', () => {
  beforeEach(() => {
    cy.visit('/?path=/story/components-browse-module--default-story&full=1');
    cy.viewport('macbook-11');

    // click right arrow button
    cy.getIframeBody().findByTestId('icon-chevron-right-heavy').click();
    cy.waitUntil(() => cy.getIframeBody().findByTestId('icon-chevron-left-heavy')).then((leftArrow) => Cypress.$(leftArrow).length);
    // Necessary to allow time for carousel animation
    cy.wait(1000);
  });

  it('Should show the left arrow and 6th Property Card when user presses right arrow', () => {
    cy.getIframeBody().find('[aria-label="prev"]').should('be.enabled');
    cy.isInViewport('[data-index="5"]');
  });

  it('Should show the previous Property Card when user presses left arrow', () => {
    cy.getIframeBody().findByTestId('icon-chevron-left-heavy').click();
    // Necessary to allow time for carousel animation
    cy.wait(1000);

    cy.isInViewport('[data-index="0"]');
  });
});
