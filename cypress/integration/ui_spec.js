
describe('The page exists', () => {
  it('Check out the calculator', () => {
    cy.visit('public/index.html')
    cy.contains('0')
  })
})
