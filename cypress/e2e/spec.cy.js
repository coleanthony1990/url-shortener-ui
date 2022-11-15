describe('empty spec', () => {
  it('shoe the page title and existing urls', () => {
    cy.intercept('http://localhost:3001/api/v1/urls', {fixture: 'stub-data.json'})
    cy.visit('http://localhost:3000')
    cy.get('h1').contains('URL Shortener')
    cy.get(':nth-child(1) > h3').contains('Awesome photo')
    cy.get(':nth-child(1) > a').contains('http://localhost:3001/useshorturl/1')
  })
  it('should show the form with the proper inputs', () => {
    cy.intercept('http://localhost:3001/api/v1/urls', {fixture: 'stub-data.json'})
    cy.visit('http://localhost:3000')
    cy.get('[placeholder="Title..."]')
    cy.get('[placeholder="URL to Shorten..."]')
    cy.get('button').contains('Shorten Please!')
  })
  it('should reflect what a user types in the input fields', () => {
    cy.intercept('http://localhost:3001/api/v1/urls', {fixture: 'stub-data.json'})
    cy.visit('http://localhost:3000')
    cy.get('[placeholder="Title..."]').type('bird')
    cy.get('[placeholder="URL to Shorten..."]').type('https://images.unsplash.com/photo-1470114716159-e389f8712fda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80')
  })
})