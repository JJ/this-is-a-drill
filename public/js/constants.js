const numberOfDigits = 10

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
  digitButtons: (() => {
    const buttons = {}
    for (const digit of digits) {
      Object.defineProperty(buttons, digit, {
        enumerable: true,
        get: () => document.getElementById(`btn-${digit}`)
      })
    }
    return buttons
  })(),
  get separatorButton () {
    return document.getElementById('btn-separator')
  },
  get clearButton () {
    return document.getElementById('btn-clear')
  },
  operationButtons: (() => {
    const buttons = {}
    for (const opCode of Object.keys(operations)) {
      Object.defineProperty(buttons, opCode, {
        enumerable: true,
        get: () => document.getElementById({
          '+': 'btn-add',
          '-': 'btn-subtract',
          '*': 'btn-multiply',
          '/': 'btn-divide'
        }[opCode])
      })
    }
    return buttons
  })(),
  get calculateButton () {
    return document.getElementById('btn-calculate')
  }
}