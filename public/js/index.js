'use strict'

import { BUTTON_PREFIX, digits, elements, operations } from './constants.js'

let stored = null

function setUpEntryButtons (targetDiv) {
  for (const digit of digits) {
    const button = document.createElement('button')
    button.setAttribute('id', `${BUTTON_PREFIX}-${digit}`)
    button.appendChild(document.createTextNode(digit))
    button.addEventListener('click', function () {
      elements.display.textContent += digit
    })
    targetDiv.appendChild(button)
  }

  elements.separatorButton.addEventListener('click', function () {
    const text = elements.display.textContent
    if (text.length && text.indexOf('.') === -1) { elements.display.textContent += '.' }
  })

  elements.clearButton.addEventListener('click', function () {
    elements.display.textContent = ''
    stored = null
  })
}

function calculate () {
  const [first, second] = [stored.text, elements.display.textContent]
    .map((text) => parseFloat(text))
  console.log(stored)
  return stored.opCode(first, second)
}

function setUpOperationButtons (targetDiv) {
  for (const opCode of Object.keys(operations)) {
    const button = document.createElement('button')
    button.setAttribute('id', `${BUTTON_PREFIX}-${operations[opCode][0]}`)
    button.appendChild(document.createTextNode(opCode))
    button.addEventListener('click', function () {
      stored = {
        text: stored ? calculate() : elements.display.textContent,
        opCode: operations[opCode][1]
      }
      elements.display.textContent = ''
    })
    targetDiv.appendChild(button)
  }
}

function setUpCalculateButton () {
  elements.calculateButton.addEventListener('click', function () {
    if (!stored) { return }
    elements.display.textContent = calculate()
    stored = null
  })
}

function setUpKeyBindings() {
  document.addEventListener( 'keydown', event => {
    console.log( event )
    if ( event.key >= digits[0] && event.key <= digits[digits.length -1 ] ) {
      elements.numberButton( event.key ).click()
    }
  })
}

(() => {
  const buttonDiv = document.getElementById('buttons')
  setUpEntryButtons(buttonDiv)
  setUpOperationButtons(buttonDiv)
  setUpCalculateButton()
  setUpKeyBindings()
})()
