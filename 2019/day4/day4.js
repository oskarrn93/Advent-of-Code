const fs = require("fs");

const inputFile = "./input.txt";

let data = null;

const HALT_CODE = 99;
const ADD_CODE = 1;
const MULTIPLY_CODE = 2;
const MOVE_CODE = 3;
const OUTPUT_CODE = 4;

const POSITION_MODE = 0;
const IMMEDIATE_MODE = 1;

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

const part1 = ({ data, noun = 12, verb = 2, instructionPointer = 0 }) => {
  //reset the input to before crash
  data[1] = noun;
  data[2] = verb;

  while (true) {
    const opCode = data[instructionPointer];

    const MODE = opCode.slice(0, 2);
    const CODE = opCode.slice(2);

    if (MODE === 0) {
      if (CODE === HALT_CODE) {
        break;
      } else if (CODE === ADD_CODE) {
        data[data[instructionPointer + 3]] =
          data[data[instructionPointer + 1]] +
          data[data[instructionPointer + 2]];
      } else if (CODE === MULTIPLY_CODE) {
        data[data[instructionPointer + 3]] =
          data[data[instructionPointer + 1]] *
          data[data[instructionPointer + 2]];
      } else if (CODE === MOVE_CODE) {
        data[data[instructionPointer + 1]] = data[instructionPointer + 1];
      } else if (CODE === OUTPUT_CODE) {
        return data[data[instructionPointer + 1]];
      } else {
        console.error(`Invalid CODE: ${CODE}`);
      }
    } else if ( MODE === 1) {

    }

    instructionPointer += 4;
  }

  return data[0];
};

console.log(`Part1 answer is: ${part1({ data: [...data] })}`);
