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
    cy.get('#phone-checkbox').check()
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
  it('exemplo do uso do contains', () => {
    cy.contains('button', 'Enviar').click()
  })
  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product').select('YouTube')
      .should('have.value', 'youtube')
  })
  it('seleciona um produto (Mentoria) por seu texto', () => {
    cy.get('#product').select('Mentoria')
      .should('have.value', 'mentoria')
  })
  it('seleciona um produto (Blog) por seu texto', () => {
    cy.get('#product').select('Blog')
      .should('have.value', 'blog')
  })
  it('seleciona um produto (Cursos) por seu texto', () => {
    cy.get('#product').select('Cursos')
      .should('have.value', 'cursos')
  })
  it('seleciona um produto (YouTube) por seu value', () => {
    cy.get('#product').select('youtube')
      .should('have.value', 'youtube')
  })
  it('seleciona um produto (Mentoria) por seu value', () => {
    cy.get('#product').select('mentoria')
      .should('have.value', 'mentoria')
  })
  it('seleciona um produto (Blog) por seu value', () => {
    cy.get('#product').select('blog')
      .should('have.value', 'blog')
  })
  it('seleciona um produto (Cursos) por seu value', () => {
    cy.get('#product').select('cursos')
      .should('have.value', 'cursos')
  })
  it('seleciona um produto (YouTube) por seu indice', () => {
    cy.get('#product').select(4)
      .should('have.value', 'youtube')
  })
  it('seleciona um produto (Mentoria) por seu indice', () => {
    cy.get('#product').select(3)
      .should('have.value', 'mentoria')
  })
  it('seleciona um produto (Blog) por seu indice', () => {
    cy.get('#product').select(1)
      .should('have.value', 'blog')
  })
  it('seleciona um produto (Cursos) por seu indice', () => {
    cy.get('#product').select(2)
      .should('have.value', 'cursos')
  })

  it('marca o tipo de atendimento "Feedback', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')
  })
  it('marca o tipo de atendimento "Elogio', () => {
    cy.get('input[type="radio"][value="elogio"]')
      .check()
      .should('be.checked')
  })
  it('marca o tipo de atendimento "Ajuda', () => {
    cy.get('input[type="radio"][value="ajuda"]')
      .check()
      .should('be.checked')
  })
  // marca o radio um por um e valida
  // each recebe cada posição do array
  // wrap empacota os elementos para utilizar os comandos do cypress
  it('marca o tipo de atendimento com "each', () => {
    cy.get('input[type="radio"]')
      .each((typeOfService) => {
        cy.wrap(typeOfService)        
          .check()
          .should('be.checked')
      })      
  })
  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last() // pega o último elemento
      .uncheck() // desmarca o último
      .should('not.to.be.checked')
  })  
})