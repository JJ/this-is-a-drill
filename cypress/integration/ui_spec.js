import { BUTTON_PREFIX, digits, elements, operations } from '../../public/js/constants.js'

describe('The page exists and buttons can be clicked', () => {

  beforeEach(() => {
     cy.visit('public/index.html')
  })

  it('Check out the calculator', () => {
    for (const digit of digits) {
        cy.get(`#${BUTTON_PREFIX}-${digit}`).contains(digit)
    }
  })
})

describe('Calculator works', () => {
  it('Can click on numbers and they show on screen', () => {
    for (const digit of digits) {
        cy.get(`#${BUTTON_PREFIX}-${digit}`).click()
    }
    cy.get("#display").contains("0123456789")
  })
})

