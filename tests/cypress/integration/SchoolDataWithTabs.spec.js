/// <reference types="cypress" />

context('SchoolDataWithTabs', () => {
  beforeEach(() => {
    cy.visit('/?path=/story/components-school-data-with-tabs--default-story&full=1');
  });

  it('Should collapse the list by clicking the View More link', () => {
    cy.getIframeBody().findByText('High School').click();

    // Ensure 3 school data exist by default
    cy.getIframeBody().find('.school-item').its('length').should('eq', 3)
    cy.getIframeBody().find('.icon-after').click();

    // Ensure 6 school data exist after clicking View More link
    cy.getIframeBody().find('.school-item').its('length').should('eq', 6)
  });
});
