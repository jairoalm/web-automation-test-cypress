describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('src/index.html')
  });
  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')    
  })
  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longText = Cypress._.repeat('Escola do teste', 20)
    cy.get('#firstName').type('Jairo')
    cy.get('#lastName').type('Monteiro')
    cy.get('#email').type('jairoam85@gmail.com')
    cy.get('#phone').type('83999448035')
    cy.get('#open-text-area').type(longText, { delay: 0})
    cy.get('button[type="submit"]').click()

    cy.get('.success').should('be.visible')
    cy.get('.success').should('contain.text', 'Mensagem enviada com sucesso')
  })
})