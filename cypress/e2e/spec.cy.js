describe('empty spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });
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
  it('should render the new shortened url if the form is filled out and submitted', () => {
    cy.intercept('POST', 'http://localhost:3001/api/v1/urls', {
      statusCode: 201,
      body: {
        id: 2,
        long_url: "https://images.unsplash.com/photo-1470114716159-e389f8712fda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80", 
        short_url: "http://localhost:3001/useshorturl/2",
        title: "bird"
      }
    })
    cy.get('[placeholder="Title..."]').type('bird')
    cy.get('[placeholder="URL to Shorten..."]').type('https://images.unsplash.com/photo-1470114716159-e389f8712fda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80')
    cy.get('button').contains('Shorten Please!').click()
    cy.get(':nth-child(2) > h3').contains('bird')
    cy.get(':nth-child(2) > a').contains('http://localhost:3001/useshorturl/2')
    cy.get(':nth-child(2) > p').contains('https://images.unsplash.com/photo-1470114716159-e389f8712fda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80')


  })
})