import addContext from 'mochawesome/addContext';

// Fires after the test and all afterEach and after hooks run.
// https://docs.cypress.io/api/events/catalog-of-events.html#Cypress-Events
Cypress.on('test:after:run', (test, runnable) => {
  if (test.state === 'failed') {
    let item = runnable;
    const nameParts = [runnable.title];

    // Iterate through all parents and grab the titles
    while (item.parent) {
      nameParts.unshift(item.parent.title);
      item = item.parent;
    }

    if (runnable.hookName) {
      nameParts.push(`${runnable.hookName} hook`);
    }

    // this is how cypress joins the test title fragments
    const fullTestName = nameParts.filter(Boolean).join(' -- ');
    const screenshotPath = `screenshots/${Cypress.spec.name}/${fullTestName} (failed).png`.replace(/ /g, '-');

    addContext({ test }, screenshotPath);
  }
});

Cypress.Commands.add('getIframeBody', () => {
  // get the iframe > document > body
  // and retry until the body element is not empty
  cy.log('getIframeBody');

  return (
    cy
      .get('#storybook-preview-iframe', { log: false })
      .its('0.contentDocument.body', { log: false })
      .should('not.be.empty')
      // wraps "body" DOM element to allow
      // chaining more Cypress commands, like ".find(...)"
      // https://on.cypress.io/wrap
      .then((body) => cy.wrap(body, { log: false }))
  );
});

// Ensure element is inside the viewport
Cypress.Commands.add('isInViewport', (element) => {
  cy.getIframeBody().find(element).then(($el) => {
      const state = Cypress.$(cy.state('window'));
      const windowWidth = state.width();
      const rect = $el[0].getBoundingClientRect();

      expect(rect.x).to.be.within(0, windowWidth);
    });
});
