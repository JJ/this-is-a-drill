const numberOfDigits = 10
const BUTTON_PREFIX = 'btn'

const digits = [...Array(numberOfDigits)].map((_, i) => i.toString())

const operations = {
  '+': ['add', (first, second) => first + second],
  '-': ['subtract', (first, second) => first - second],
  '*': ['multiply', (first, second) => first * second],
  '/': ['divide', (first, second) => first / second]
}

const elements = {
  get display () {
    return document.getElementById('display')
  },
  numberButton: function ( number ) {
    return document.getElementById(`${BUTTON_PREFIX}-${number}`)
  },
  opButton: function ( op ) {
    console.log(op)
    if ( Object.keys(operations).indexOf(op) > -1 ) {
      return document.getElementById(`${BUTTON_PREFIX}-${operations[op][0]}`)
    } else {
      throw `operator ${op} does not exist`
    }
  },
  get separatorButton () {
    return document.getElementById(`${BUTTON_PREFIX}-separator`)
  },
  get clearButton () {
    return document.getElementById(`${BUTTON_PREFIX}-clear`)
  },
  get calculateButton () {
    return document.getElementById(`${BUTTON_PREFIX}-calculate`)
  }
}

export { BUTTON_PREFIX, operations, elements, digits }
