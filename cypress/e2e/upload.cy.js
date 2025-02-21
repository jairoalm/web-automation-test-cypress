describe('Upload de Arquivos', () => {
    beforeEach(() => {
      cy.visit('src/index.html')
    });
    it.only('seleciona um arquivo da pasta fixtures', () => {
        cy.get('#file-upload')
          .selectFile('cypress/fixtures/example.json')
          .should(input => {
            expect(input[0].files[0].name).to.equal('example.json')            
          })
    }) 
    it.only('seleciona um arquivo simulando drag-and-drop ', () => {
        cy.get('#file-upload')
          .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
          .should(input => {
            expect(input[0].files[0].name).to.equal('example.json')            
          })
    }) 
    it.only('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias ', () => {
        cy.fixture('example.json').as('sampleFile')
        cy.get('#file-upload')
          .selectFile('@sampleFile')
          .should(input => {
            expect(input[0].files[0].name).to.equal('example.json')            
          })
    })  
  })