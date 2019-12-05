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
  console.log("isSixDigits");

  if (Number.isInteger(parseInt(password)) === false) {
    console.error('isSixDigits failed number is integer')
    return false; 
  }
  if (password.length != 6) {
    console.error('isSixDigits failed number length')
    return false;
  }
  return true;
};

const isWithinRangeOfInput = (password, lower, upper) => {
  console.log("isWithinRangeOfInput");

  if (password < lower) return false;
  if (password > upper) return false;
  return true;
};

const isTwoAdjacentDigitsAreSame = password => {
  console.log("isTwoAdjacentDigitsAreSame");
  const counter = {};
  const arrayOfNumbers = [...password];
  arrayOfNumbers.forEach(number => {
    const tmp = arrayOfNumbers.reduce(function(accumulator, element, index) {
      if (element === number) accumulator.push(index);
      return accumulator;
    }, []);

    counter[number] = tmp;
  });

  // console.log(counter);
  const result = Object.entries(counter).filter(
    ([key, value]) => value.length > 1
  );
  // console.log(result);

  if (result.length < 1) return false;

  return true;
};

const isDigitsIncreasing = password => {
  console.log("isDigitsIncreasing");
  const arrayOfNumbers = [...password];

  const result = arrayOfNumbers.every((numberToCheck, index) => {
    let numberIsLarger = arrayOfNumbers
      .slice(index)
      .filter(numberToCompare => numberToCheck > numberToCompare);
    return numberIsLarger.length == 0;
  });
  // console.log(result);
  return result;
};

const validateCriterias = (potentialPasswords, lower, upper) => {
  //console.log(potentialPasswords);

  const result = potentialPasswords.filter(potentialPassword => {
    // console.log('potentialPasswords', potentialPasswords)

    if (!isSixDigits(potentialPassword)) return false;
    if (!isWithinRangeOfInput(potentialPassword, lower, upper)) return false;
    if (!isTwoAdjacentDigitsAreSame(potentialPassword)) return false;
    if (!isDigitsIncreasing(potentialPassword)) return false;
    return true
  });

  console.log('validateCriterias result', result)
  return result
};

const generatePotentialPasswords = (lower, upper) => {
  const potentialPasswords = [];
  for (let a = lower; a < upper; a++) {
    potentialPasswords.push(a.toString());
  }
  //console.log('potentialPasswords', potentialPasswords)
  return potentialPasswords;
};

const part1 = input => {
  const [lower, upper] = input.split("-");
  const potentialPasswords = generatePotentialPasswords(lower, upper);

  const result = validateCriterias(potentialPasswords, lower, upper);
  return result;
};



console.log(`Part1 answer is: ${part1(input).length}`);
