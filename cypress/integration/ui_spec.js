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
    cy.get(btnName('clear')).click()
    cy.get("#display").contains(/^$/)
  })

  it('Avoids double separators', () => {
    cy.get(btnName(1)).click()
    cy.get(btnName('separator')).click()
    cy.get(btnName(1)).click()
    cy.get(btnName('separator')).click()
    cy.get("#display").contains(/^1\.1$/)
  })

  it('Performs operations correctly', () => {
    const NUMBER = 42
    for (const opCode of Object.keys(operations)) {
      clickStream(NUMBER)
      cy.get(btnName(operations[opCode][0])).click()
      clickStream(NUMBER)
      cy.get(btnName('calculate')).click()
      cy.get("#display").contains( eval ( NUMBER.toString() + opCode + NUMBER.toString() ))
    }
  })
})

function btnName( arg ) {
    return `#${BUTTON_PREFIX}-${arg}`
}

function clickStream( arg ) {
  let str = typeof arg == 'string' ? arg : arg.toString()
  for ( let c of str[Symbol.iterator]() ) {
    cy.get( btnName( c ) ).click()
  }
}