import { BUTTON_PREFIX, digits, elements, operations } from '../../public/js/constants.js'

describe('The page exists', () => {
  it('Check out the calculator', () => {
    cy.visit('public/index.html')
    for (const digit of digits) {
        cy.get(`#${BUTTON_PREFIX}-${digit}`).contains(digit)
    }
  })
})


