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

const calculateRequiredFuel = (mass, total) => {
    console.log("calculateRequiredFuel", "mass", mass, "total", total)

    const fuel = Math.floor(mass / 3) - 2

    if(fuel <= 0) return total

    total += fuel

    return calculateRequiredFuel(fuel, total)
}

data = data.split("\n")
        .map(mass => calculateRequiredFuel(mass, 0))
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0)

console.log(`Answer is: ${data}`)
