'use strict'

import { digits, elements, operations } from './constants.js'

let stored = null

function setUpAButton( text ) {
  const button = document.createElement('button')
  button.setAttribute('id', elements.btnId(text))
  button.appendChild(document.createTextNode(text))
  return button
}

function setUpEntryButtons (targetDiv) {
  for (const digit of digits) {
    const button = setUpAButton( digit )
    button.addEventListener('click', function () {
      elements.display.textContent += digit
    })
    targetDiv.appendChild(button)
  }

}

function calculate () {
  const [first, second] = [stored.text, elements.display.textContent]
    .map((text) => parseFloat(text))
  console.log(stored)
  return stored.opCode(first, second)
}

function setUpOperationButtons (targetDiv) {
  for (const opCode of Object.keys(operations)) {
    const button = setUpAButton(opCode)
    if ( opCode == '-' ) {
      button.addEventListener('click', function () {
        if ( elements.display.textContent == '' ) {
          elements.display.textContent += '-'
        } else {
          stored = {
            text: stored ? calculate() : elements.display.textContent,
            opCode: operations[opCode][1]
          }
          elements.display.textContent = ''
        }
      })
    } else {
      button.addEventListener('click', function () {
        stored = {
          text: stored ? calculate() : elements.display.textContent,
          opCode: operations[opCode][1]
        }
        elements.display.textContent = ''
      })
    }
    targetDiv.appendChild(button)
  }
}

function setUpAuxiliaryButtons ( targetDiv ) {
  let button = setUpAButton( "." )
  button.addEventListener('click', function () {
    const text = elements.display.textContent
    if (text.length && text.indexOf('.') === -1) { elements.display.textContent += '.' }
  })
  targetDiv.appendChild(button)

  button = setUpAButton( "C")
  button.addEventListener('click', function () {
    elements.display.textContent = ''
    stored = null
  })
  targetDiv.appendChild(button)

  button = setUpAButton( "=" )
  button.addEventListener('click', function () {
    if (!stored) { return }
    elements.display.textContent = calculate()
    stored = null
  })
  targetDiv.appendChild(button)

}

function setUpKeyBindings () {
  document.addEventListener('keydown', event => {
    console.log(event)
    if (elements.isDigit(event.key)) {
      elements.numberButton(event.key).click()
    }

    if (elements.isOpcode(event.key)) {
      elements.opButton(event.key).click()
    }

    if (elements.isAux(event.key)) {
      elements.auxButton(event.key).click()
    }
  })
}

(() => {
  const buttonDiv = document.getElementById('buttons')
  setUpEntryButtons(buttonDiv)
  setUpOperationButtons(buttonDiv)
  setUpAuxiliaryButtons(buttonDiv)
  setUpKeyBindings()
})()
