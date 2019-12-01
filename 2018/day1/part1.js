const fs = require('fs')

const inputFile = './input.txt'

let data = null

try {
    data = fs.readFileSync(inputFile, 'utf8')
}
catch(error) {
    console.error(error)
    exit()
}

const answer = data.split("\n")
        .filter(item => item != "")
        .map(item => parseInt(item))
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0)

console.log(`Answer is: ${answer}`)

