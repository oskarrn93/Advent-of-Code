const fs = require('fs')

const inputFile = './input.txt'

let data = null
const frequencies = {}
let answer = null
let tmp = 0

try {
  data = fs.readFileSync(inputFile, 'utf8')
          .split("\n")
          .filter(item => item != "")
          .map(item => parseInt(item))
}
catch(error) {
    console.error(error)
    exit()
}

while (answer === null) {
  tmp = data.reduce((accumulator, currentValue) =>  {
    if(accumulator in frequencies && answer === null) {
      answer = accumulator
    }
  
    frequencies[accumulator] = 1

    return accumulator + currentValue 
  }, tmp)      
}

console.log(`Answer is: ${answer}`)





