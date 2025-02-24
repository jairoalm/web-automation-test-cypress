it('testa a página da política de privacidade de forma independente', () => {
    const text = "Talking About Testing"
    cy.visit('src/privacy.html')
    cy.contains('h1', 'CAC TAT - Política de Privacidade')
      .should('be.visible')
    cy.contains('p', text)
      .should('be.visible')
}) 