const fs = require("fs");

const inputFile = "./input.txt";

let data = null;

const HALT_CODE = 99;
const ADD_CODE = 1;
const MULTIPLY_CODE = 2;

const PART2_DESIRED_OUTPUT = 19690720;

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

  return data[0];
};

const part2 = data => {
  for (let noun = 1; noun < 99; noun++) {
    for (let verb = 1; verb < 99; verb++) {
      if (part1({ data: [...data], noun, verb }) === PART2_DESIRED_OUTPUT) {
        return 100 * noun + verb;
      }
    }
  }
};

console.log(`Part1 answer is: ${part1({ data: [...data] })}`);
console.log(`Part2 answer is: ${part2([...data])}`);
