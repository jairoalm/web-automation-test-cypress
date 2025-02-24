describe('Trabalhando com novas Abas', () => {
    beforeEach(() => {
      cy.visit('src/index.html')
    });
    it('verificar que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.contains('a', 'Política de Privacidade')
          .should('have.attr', 'href', 'privacy.html')
          .and('have.attr', 'target', '_blank')
    })  
    it('acessa a página da plítica de privacidade removendo o target e então clicando no lik', () => {
        cy.contains('a', 'Política de Privacidade')
          .invoke('removeAttr', 'target')
          .click()
        
        cy.contains('h1', 'CAC TAT - Política de Privacidade')
          .should('be.visible')
    })       
  })