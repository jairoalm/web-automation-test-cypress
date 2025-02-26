describe('Execricios extras', () => {
    beforeEach(() => {
      cy.visit('src/index.html')
    });
    // exemplo
      //cy.clock() // congela o relógio do navegador
      // ação que dispara algo que exibe uma mensagem por três segundos
      // verificação de que a mensagem está visível
      //cy.tick(3000) // avança o relógio três segundos (em milissegundos). Avanço este tempo para não
      //perdê-lo esperando.
      // verificação de que a mensagem não está mais visível.    

      // serve para deixar os testes mais rápidos. 
      // Exemplo são mensagens de Toast que demorando para aparecer e também para sumir
      // para repetir o teste várias vezes Cypress._.times(3, () => {
      Cypress._.times(3, () => {
        it('congelando o relógio para exibir mensagem de sucesso', () => {        
            cy.clock()
            const longText = Cypress._.repeat('Escola do teste', 20)
            cy.get('#firstName').type('João')
            cy.get('#lastName').type('Monteiro')
            cy.get('#email').type('teste@gmail.com')
            cy.get('#phone').type('99999999999')
            cy.get('#open-text-area').type(longText, { delay: 0})
            cy.get('button[type="submit"]').click()
        
            cy.get('.success').should('be.visible')
            cy.get('.success').should('contain.text', 'Mensagem enviada com sucesso')

            cy.tick(3000)

            cy.get('.success').should('not.be.visible')
        })        
      })     
      
      it('exibe e oculta as mensagens de sucesso e erro usando .invoke()', () => {
        cy.get('.success')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Mensagem enviada com sucesso.')
            .invoke('hide')
            .should('not.be.visible')
        cy.get('.error')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Valide os campos obrigatórios!')
            .invoke('hide')
            .should('not.be.visible')
      })
      it('preenche o campo da área de texto usando o comando invoke', () => {
        cy.get('#open-text-area')
            .invoke('val', 'teste')
            .should('have.value', 'teste')
      })
      it('faz uma requisição HTTP', () => {
        cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
            .as('getRequest')
            .its('status')
            .should('be.equal', 200)
        cy.get('@getRequest')
            .its('statusText')
            .should('be.equal', 'OK')
        cy.get('@getRequest')
            .its('body')
            .should('include', 'CAC TAT')
      })

      it('achar o gato escondido', () => {
        cy.get('#cat')
            .invoke('show') //mostrar elementos escondidos.
            .should('be.visible')
        cy.get('#title')
            .invoke('text', 'CAT TAT') // alterando o título da página        
        cy.get('#subtitle')
            .invoke('text', 'Eu amo gatos!') // alterando o título da página
      })
})