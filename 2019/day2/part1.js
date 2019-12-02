const fs = require("fs");

const inputFile = "./input.txt";

let data = null;
let index = 0;

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

//reset the input to before crash
data[1] = 12
data[2] = 2

while (true) {
  const opCode = data[index];

  if (opCode === HALT_CODE) {
    break;
  } else if (opCode === ADD_CODE) {
    const inputPositionOne = data[index + 1];
    const inputPositionTwo = data[index + 2];
    const outputPosition = data[index + 3];

    data[outputPosition] = data[inputPositionOne] + data[inputPositionTwo];
  } else if (opCode === MULTIPLY_CODE) {
    const inputPositionOne = data[index + 1];
    const inputPositionTwo = data[index + 2];
    const outputPosition = data[index + 3];

    data[outputPosition] = data[inputPositionOne] * data[inputPositionTwo];
  } else {
    console.error(`Invalid opCode: ${opCode}`);
  }

  index += 4;
}

console.log(`Answer is: ${data[0]}`);
