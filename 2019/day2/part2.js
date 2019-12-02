const fs = require("fs");

const inputFile = "./input.txt";

let data = null;
let instructionPointer = 0;

const HALT_CODE = 99;
const ADD_CODE = 1;
const MULTIPLY_CODE = 2;

try {
  data = fs
    .readFileSync(inputFile, "utf8")
    .trim()
    .split(",")
    .map(item => parseInt(item));
} catch (error) {
  console.error(error);
  exit();
}

while (true) {
  const opCode = data[instructionPointer];

  if (opCode === HALT_CODE) {
    break;
  } else if (opCode === ADD_CODE) {
    const noun = data[instructionPointer + 1];
    const verb = data[instructionPointer + 2];
    const outputPosition = data[instructionPointer + 3];

    data[outputPosition] = data[noun] + data[verb];
  } else if (opCode === MULTIPLY_CODE) {
    const noun = data[instructionPointer + 1];
    const verb = data[instructionPointer + 2];
    const outputPosition = data[instructionPointer + 3];

    data[outputPosition] = data[noun] * data[verb];
  } else {
    console.error(`Invalid opCode: ${opCode}`);
  }

  instructionPointer += 4;
}

console.log(`Answer is: ${data[0]}`);
