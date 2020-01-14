const fs = require("fs");

const inputFile = "./input.txt";

let input = null;

try {
  input = fs.readFileSync(inputFile, "utf8").trim();
} catch (error) {
  console.error(error);
  exit();
}

const isSixDigits = password => {
  if (Number.isInteger(parseInt(password)) === false) {
    console.error("isSixDigits failed number is integer");
    return false;
  }
  if (password.length != 6) {
    console.error("isSixDigits failed number length");
    return false;
  }
  return true;
};

const isWithinRangeOfInput = (password, lower, upper) => {
  if (password < lower) return false;
  if (password > upper) return false;
  return true;
};

const getIndexByNumbers = password => {
  const counter = {};
  const arrayOfNumbers = [...password];
  arrayOfNumbers.forEach(number => {
    const tmp = arrayOfNumbers.reduce(function(accumulator, element, index) {
      if (element === number) accumulator.push(index);
      return accumulator;
    }, []);

    counter[number] = tmp;
  });

  const result = Object.entries(counter).filter(
    ([key, value]) => value.length > 1
  );

  return result;
};

const isTwoAdjacentDigitsAreSame = password => {
  const result = getIndexByNumbers(password);

  if (result.length < 1) return false;

  return true;
};

const isDigitsIncreasing = password => {
  const arrayOfNumbers = [...password];

  const result = arrayOfNumbers.every((numberToCheck, index) => {
    let numberIsLarger = arrayOfNumbers
      .slice(index)
      .filter(numberToCompare => numberToCheck > numberToCompare);
    return numberIsLarger.length == 0;
  });
  return result;
};

const validateCriteriasPart1 = (potentialPassword, lower, upper) => {
  if (!isSixDigits(potentialPassword)) return false;
  if (!isWithinRangeOfInput(potentialPassword, lower, upper)) return false;
  if (!isTwoAdjacentDigitsAreSame(potentialPassword)) return false;
  if (!isDigitsIncreasing(potentialPassword)) return false;
  return true;
};

const validateCriteriasPart2 = (potentialPassword, lower, upper) => {
  if (!isSixDigits(potentialPassword)) return false;
  if (!isWithinRangeOfInput(potentialPassword, lower, upper)) return false;
  if (!isTwoAdjacentDigitsAreSame(potentialPassword)) return false;
  if (!isDigitsIncreasing(potentialPassword)) return false;
  if (!isNotPartOfALargerMatchingGroup(potentialPassword)) return false;
  return true;
};

const testEveryPassword = (
  potentialPasswords,
  lower,
  upper,
  validationFunction
) => {
  const result = potentialPasswords.filter(potentialPassword => {
    return validationFunction(potentialPassword, lower, upper);
  });

  return result;
};

const isNotPartOfALargerMatchingGroup = password => {
  const indexByNumbers = getIndexByNumbers(password);
  const nrOfOccurences = indexByNumbers.map(([index, value]) => value.length);
  return nrOfOccurences.some(element => element === 2);
};

const generatePotentialPasswords = (lower, upper) => {
  const potentialPasswords = [];
  for (let a = lower; a < upper; a++) {
    potentialPasswords.push(a.toString());
  }
  return potentialPasswords;
};

const part1 = input => {
  const [lower, upper] = input.split("-");
  const potentialPasswords = generatePotentialPasswords(lower, upper);

  return testEveryPassword(
    potentialPasswords,
    lower,
    upper,
    validateCriteriasPart1
  );
};

const part2 = input => {
  const [lower, upper] = input.split("-");
  const potentialPasswords = generatePotentialPasswords(lower, upper);

  return testEveryPassword(
    potentialPasswords,
    lower,
    upper,
    validateCriteriasPart2
  );
};

console.log(`Part1 answer is: ${part1(input).length}`);
console.log(`Part2 answer is: ${part2(input).length}`);
