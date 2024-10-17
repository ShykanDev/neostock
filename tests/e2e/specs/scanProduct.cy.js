describe('testProductsCodesInput', () => {
    beforeEach(()=>{
        cy.visit('/scan');
    })
    it('switchBetweenViews', () => {
        cy.get('[data-cy="routerScanProduct"]').click();
        cy.get('[data-cy="routerProducts"]').click();
        cy.url().should('include','/');
        cy.get('[data-cy="routerScanProduct"]').click();
        cy.url().should('include','/scan');
    });
    const simulateKeyPresses = (characters) => {
        cy.window().then((win) => {
          characters.split('').forEach((char) => {
            const event = new KeyboardEvent('keypress', { key: char });
            win.document.dispatchEvent(event);
          });
        });
      };
    it('testCodes', () => {
        cy.url().should('include','/scan');
        simulateKeyPresses('123456798')
    });
})