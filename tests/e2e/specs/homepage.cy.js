describe('Home Page Test', () => {
    beforeEach(() => {
        // run these tests as if in a desktop
        // browser with a 720p monitor
        cy.viewport(1350, 720)
      }) //run at 1350x720
    it('should load the home page', () => {
      cy.visit('/');  // Visita la página raíz de tu aplicación
      cy.contains('h1', 'Listado de todos los productos');  // Busca un texto específico en la página
    });
  });

  describe('Items Visible', () => { //verify that when user visit the view, should load items by default 
    beforeEach(() => {
        cy.viewport(1350, 720)
      })//run at 1350x720
    it('should get the seach bar input', () => {
        cy.visit('/');
        cy.get('#inputSearchBar') // Selecciona un input de tipo texto
        .should('be.visible') // Verifica que sea visible
        .type('Tang de limón'); // Escribe en el input
        cy.get('.cardProduct')
        .should('be.visible')
        cy.get('h2').contains('Tang de Limón').should('be.visible')
    });
    it('should not load any item', () => {
        cy.visit('/');
        cy.get('#inputSearchBar').type('This item does not exist');
        cy.contains('h2', 'No se encontró ningun resultado, prueba verificando el nombre del producto nuevamente').should('be.visible');
        cy.get('#getBackListProducts').click();
        cy.get('[data-cy="noItemsArticle"]').should('not.be.visible');
    })
  })
  
