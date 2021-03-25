import { digits, elements, operations, auxiliary } from '../../public/js/constants.js'

const allDigits = digits.join("")
const allDigitsRe = new RegExp("^"+allDigits+"$")

describe('The page exists and buttons can be clicked', () => {

  beforeEach(() => {
     cy.visit('public/index.html')
     cy.get("#btn-clear").click()
  })

  it('Check out the calculator', () => {
    for (const digit of digits) {
        cy.get(elements.btnName(digit)).contains(digit)
    }
  })

  it('Can click on numbers and they show on screen', () => {
    for (const digit of digits) {
        cy.get(elements.btnName(digit)).click()
    }
    cy.get("#display").contains(allDigitsRe)
    cy.get(elements.btnName('clear')).click()
    cy.get("#display").contains(/^$/)
  })

  it('Avoids double separators', () => {
    cy.get(elements.btnName(1)).click()
    cy.get(elements.btnName('separator')).click()
    cy.get(elements.btnName(1)).click()
    cy.get(elements.btnName('separator')).click()
    cy.get("#display").contains(/^1\.1$/)
  })

  it('Performs operations correctly', () => {
    const NUMBER = 42
    for (const opCode of Object.keys(operations)) {
      clickStream(NUMBER)
      cy.get(elements.btnName(operations[opCode][0])).click()
      clickStream(NUMBER)
      cy.get(elements.btnName('calculate')).click()
      cy.get("#display").contains( eval ( NUMBER.toString() + opCode + NUMBER.toString() ))
    }
  })

  it('Works with keybindings', () => {
    for (const digit of digits) {
      cy.get('body').trigger("keydown", { key: digit });
    }
    cy.get("#display").contains(allDigitsRe)
  })

  it('Performs key-bound operations', () => {
    let ops = "33*33"
    keyStream( ops )
    cy.get(elements.btnName('calculate')).click()
    cy.get("#display").contains( eval ( ops ))
    cy.get(elements.btnName('clear')).click()
    ops = "33/33"
    keyStream( ops + "=")
    cy.get("#display").contains( eval ( ops ))
  })

})

function clickStream( arg ) {
  let str = typeof arg == 'string' ? arg : arg.toString()
  for ( let c of str[Symbol.iterator]() ) {
    cy.get( elements.btnName( c ) ).click()
  }
}

function keyStream( arg ) {
  let str = typeof arg == 'string' ? arg : arg.toString()
  for ( let c of str[Symbol.iterator]() ) {
    cy.get('body').trigger( "keydown", { key: c })
  }
}