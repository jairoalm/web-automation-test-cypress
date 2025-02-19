describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('src/index.html')
  });
  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')    
  })
  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longText = Cypress._.repeat('Escola do teste', 20)
    cy.get('#firstName').type('João')
    cy.get('#lastName').type('Monteiro')
    cy.get('#email').type('teste@gmail.com')
    cy.get('#phone').type('99999999999')
    cy.get('#open-text-area').type(longText, { delay: 0})
    cy.get('button[type="submit"]').click()

    cy.get('.success').should('be.visible')
    cy.get('.success').should('contain.text', 'Mensagem enviada com sucesso')
  })
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('João')
    cy.get('#lastName').type('Monteiro')
    cy.get('#email').type('teste@gmail,com')
    cy.get('#phone').type('99999999999')
    cy.get('#open-text-area').type("texto long")
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
    cy.get('.error').should('contain.text', 'Valide os campos obrigatórios!')
  })
  it('campo telefone continua vazio quando preenchido com um valor não-numérico', () => {
    cy.get('#phone')
      .type('abcde')
      .should('have.value', '')
  })

  it('exibe mensagem de erro quando telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('João')
    cy.get('#lastName').type('Monteiro')
    cy.get('#email').type('teste@gmail.com')
    cy.get('#open-text-area').type("texto long")
    cy.get('#phone-checkbox').click()
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
    cy.get('.error').should('contain.text', 'Valide os campos obrigatórios!')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('João')
      .should('have.value', 'João')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('Monteiro')
      .should('have.value', 'Monteiro')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('teste@gmail.com')
      .should('have.value', 'teste@gmail.com')
      .clear()
      .should('have.value', '')
    cy.get('#phone')
      .type('99999999999')
      .should('have.value', '99999999999')
      .clear()
      .should('have.value', '')
  })
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
    cy.get('.error').should('contain.text', 'Valide os campos obrigatórios!')
  })
  it('envia o formulário com sucesso usando um comando customizado', () => {
    const data = {
      firstName: 'João',
      lastName: 'Monteiro',
      email: 'joao@gmail.com',
      text: 'Teste.'
    }
    cy.fillMandatoryFieldsAndSubmit(data)    
    cy.get('.success').should('be.visible')
  })
  it('envia o formulário com sucesso usando um comando customizado e valores padrão', () => {
    cy.fillMandatoryFieldsAndSubmit()    
    cy.get('.success').should('be.visible')
  })
  it.only('exemplo do uso do contains', () => {
    cy.contains('button', 'Enviar').click()
  })
})