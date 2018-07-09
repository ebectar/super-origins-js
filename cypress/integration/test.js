describe('P2 Project test', function () {
  it('has all necessary elements', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false
    })
    cy.visit('localhost:3000')
    cy.get('h1').should('have.text', 'Super Origins')
    cy.get('.default').should('have.text', 'Select Character')
    cy.get('.drop-container').click()
    cy.get('.message').should('exist')
  })
})