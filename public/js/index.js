'use strict'

import { digits, elements, operations } from './constants.js'

let stored = null

function setUpAButton (text) {
  const button = document.createElement('button')
  button.setAttribute('id', elements.btnId(text))
  button.style.fontSize = "36px" 
  button.appendChild( document.createTextNode(text))
  if ( text.match(/\d/) ) {
    button.style.backgroundColor="bisque"
  } else if ( text.match(/[\+\-\*\/]/) ) {
    button.style.backgroundColor="lightblue"
  } else {
    button.style.backgroundColor="lightpink"
  }
  return button
}

function calculate () {
  const [first, second] = [stored.text, elements.display.textContent]
    .map((text) => parseFloat(text))
  console.log(stored)
  return stored.opCode(first, second)
}

function setUpEntryButtons () {
  const targetDiv = document.getElementById('digits')
  for (const digit of digits) {
    const button = setUpAButton(digit)
    button.style.width = "33%"
    button.addEventListener('click', function () {
      elements.display.textContent += digit
    })
    targetDiv.appendChild(button)
  }
  elements.numberButton("0").style.width = "66%"
}

function setUpOperationButtons () {
  const targetDiv = document.getElementById('ops')
  for (const opCode of Object.keys(operations)) {
    const button = setUpAButton(opCode)
    button.style.width = "100%"
    if (opCode === '-') {
      button.addEventListener('click', function () {
        if (elements.display.textContent === '') {
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

function setUpAuxiliaryButtons () {
  let button = setUpAButton('.')
  button.addEventListener('click', function () {
    const text = elements.display.textContent
    if (text.length && text.indexOf('.') === -1) { elements.display.textContent += '.' }
  })
  button.style.width = "33%"
  document.getElementById('digits').appendChild(button)

  button = setUpAButton('C')
  button.addEventListener('click', function () {
    elements.display.textContent = ''
    stored = null
  })
  button.style.width="100%"
  document.getElementById('C').appendChild(button)

  button = setUpAButton('=')
  button.addEventListener('click', function () {
    if (!stored) { return }
    elements.display.textContent = calculate()
    stored = null
  })
  button.style.width="100%"
  document.getElementById('ops').appendChild(button)
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
  setUpEntryButtons()
  setUpOperationButtons()
  setUpAuxiliaryButtons()
  setUpKeyBindings()
})()
