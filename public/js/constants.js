const numberOfDigits = 10
const BUTTON_PREFIX = "btn"

const digits = [...Array(numberOfDigits)].map((_, i) => i.toString())

const operations = {
  '+': (first, second) => first + second,
  '-': (first, second) => first - second,
  '*': (first, second) => first * second,
  '/': (first, second) => first / second
}

const elements = {
  get display () {
    return document.getElementById('display')
  },
  get separatorButton () {
    return document.getElementById(`${BUTTON_PREFIX}-separator`)
  },
  get clearButton () {
    return document.getElementById(`${BUTTON_PREFIX}-clear`)
  },
  operationButtons: (() => {
    const buttons = {}
    for (const opCode of Object.keys(operations)) {
      Object.defineProperty(buttons, opCode, {
        enumerable: true,
        get: () => document.getElementById({
          '+': `${BUTTON_PREFIX}-add`,
          '-': `${BUTTON_PREFIX}-subtract`,
          '*': `${BUTTON_PREFIX}-multiply`,
          '/': `${BUTTON_PREFIX}-divide`
        }[opCode])
      })
    }
    return buttons
  })(),
  get calculateButton () {
    return document.getElementById(`${BUTTON_PREFIX}-calculate`)
  }
}

export {BUTTON_PREFIX, operations, elements, digits}
