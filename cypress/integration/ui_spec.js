import { digits, elements, operations } from '../../public/js/constants.js'

describe('The page exists', () => {
  it('Check out the calculator', () => {
    cy.visit('public/index.html')
    cy.contains('0')
  })
})


