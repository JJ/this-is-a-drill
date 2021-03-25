import { BUTTON_PREFIX, digits, elements, operations } from '../../public/js/constants.js'

describe('The page exists and buttons can be clicked', () => {

  beforeEach(() => {
     cy.visit('public/index.html')
     cy.get("#btn-clear").click()
  })

  it('Check out the calculator', () => {
    for (const digit of digits) {
        cy.get(`#${BUTTON_PREFIX}-${digit}`).contains(digit)
    }
  })

  it('Can click on numbers and they show on screen', () => {
    for (const digit of digits) {
        cy.get(`#${BUTTON_PREFIX}-${digit}`).click()
    }
    cy.get("#display").contains("0123456789")
    cy.get("#btn-clear").click()
    cy.get("#display").contains(/^$/)
  })
})

