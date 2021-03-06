const numberOfDigits = 10
const BUTTON_PREFIX = 'btn'

const digits = [...Array(numberOfDigits)].map((_, i) => i.toString())

const operations = {
  '+': ['add', (first, second) => first + second],
  '-': ['subtract', (first, second) => first - second],
  '*': ['multiply', (first, second) => first * second],
  '/': ['divide', (first, second) => first / second]
}

const auxiliary = {
  C: 'clear',
  '.': 'separator',
  '=': 'calculate'
}

const elements = {
  get display () {
    return document.getElementById('display')
  },
  isDigit: function (digit) {
    return digits.indexOf(digit) > -1
  },
  isOpcode: function (op) {
    return Object.keys(operations).indexOf(op) > -1
  },
  isAux: function (op) {
    return Object.keys(auxiliary).indexOf(op) > -1
  },
  numberButton: function (number) {
    if (this.isDigit(number)) {
      return document.getElementById(`${BUTTON_PREFIX}-${number}`)
    } else {
      throw new Error(`${number} is not a digit`)
    }
  },
  opButton: function (op) {
    if (this.isOpcode(op)) {
      return document.getElementById(`${BUTTON_PREFIX}-${operations[op][0]}`)
    } else {
      throw new Error(`operator ${op} does not exist`)
    }
  },
  auxButton: function (op) {
    if (this.isAux(op)) {
      return document.getElementById(`${BUTTON_PREFIX}-${auxiliary[op]}`)
    } else {
      throw new Error(`auxiliary operation ${op} does not exist`)
    }
  },
  btnId: function (arg) {
    if (this.isDigit(arg)) {
      return `${BUTTON_PREFIX}-${arg}`
    }
    if (this.isOpcode(arg)) {
      return `${BUTTON_PREFIX}-${operations[arg][0]}`
    }
    if (this.isAux(arg)) {
      return `${BUTTON_PREFIX}-${auxiliary[arg]}`
    }
    throw new Error('That opcode does not exist')
  },
  btnName: function (arg) { return `#${BUTTON_PREFIX}-${arg}` }
}

console.log(elements)
export { operations, elements, digits, auxiliary }
