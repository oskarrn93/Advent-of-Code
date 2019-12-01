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

data = data.split("\n")
        .map((mass) => Math.floor(mass / 3) - 2)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0)

console.log(`Answer is: ${data}`)
