'use strict'

import { BUTTON_PREFIX, digits, elements, operations } from './constants.js'

let stored = null

function setUpEntryButtons () {
  const buttonDiv = document.getElementById('buttons');
  for (const digit of digits) {
    const button = document.createElement('button');
    button.setAttribute('id', `${BUTTON_PREFIX}-${digit}`)
    button.appendChild(document.createTextNode( digit ));
    button.addEventListener('click', function () {
      elements.display.textContent += digit
    })
    buttonDiv.appendChild( button )
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
  return operations[stored.opCode](first, second)
}

function setUpOperationButtons () {
  for (const [opCode, button] of Object.entries(elements.operationButtons)) {
    button.addEventListener('click', function () {
      stored = {
        text: stored ? calculate() : elements.display.textContent,
        opCode
      }
      elements.display.textContent = ''
    })
  }
}

function setUpCalculateButton () {
  elements.calculateButton.addEventListener('click', function () {
    if (!stored) { return }
    elements.display.textContent = calculate()
    stored = null
  })
}

(() => {
  setUpEntryButtons()
  setUpOperationButtons()
  setUpCalculateButton()
})()
