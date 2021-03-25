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
  'C': 'clear',
  '.': 'separator',
  '=': 'calculate'
}

const elements = {
  get display () {
    return document.getElementById('display')
  },
  numberButton: function ( number ) {
    return document.getElementById(`${BUTTON_PREFIX}-${number}`)
  },
  opButton: function ( op ) {
    if ( Object.keys(operations).indexOf(op) > -1 ) {
      return document.getElementById(`${BUTTON_PREFIX}-${operations[op][0]}`)
    } else {
      throw `operator ${op} does not exist`
    }
  },
  auxButton: function ( op ) {
    if ( Object.keys(auxiliary).indexOf(op) > -1 ) {
      return document.getElementById(`${BUTTON_PREFIX}-${auxiliary[op]}`)
    } else {
      throw `auxiliary operation ${op} does not exist`
    }
  },
  btnName: function( arg ) {return `#${BUTTON_PREFIX}-${arg}`}, 
  get separatorButton () {
    return this.auxButton('.')
  },
  get clearButton () {
    return this.auxButton("C")
  },
  get calculateButton () {
    return this.auxButton("=")
  }
}

export { BUTTON_PREFIX, operations, elements, digits }
