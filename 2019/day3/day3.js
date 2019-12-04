const fs = require("fs");

const inputFile = "./input.txt";

try {
  [wire1, wire2] = fs
    .readFileSync(inputFile, "utf8")
    .trim()
    .split("\n");
} catch (error) {
  console.error(error);
  exit();
}

wire1 = wire1.split(",");
wire2 = wire2.split(",");

const applyVisited = ({ x, y, visited }) => {
  currentPositionString = `${x},${y}`;

  if (visited[currentPositionString] === undefined) {
    visited[currentPositionString] = 1;
  }
};

const calculateVisited = input => {
  const visited = {};

  let currentPosition = { x: 0, y: 0 };

  input.map(directions => {
    const direction = directions.substring(0, 1);
    const steps = parseInt(directions.substring(1));

    let { x, y } = currentPosition;

    if (direction === "U") {
      const limit = x + steps;
      for (let a = x + 1; a <= limit; a++) {
        applyVisited({ x: a, y, visited });
      }
      x += steps;
    } else if (direction === "D") {
      const limit = x - steps;
      for (let a = x - 1; a > limit; a--) {
        applyVisited({ x: a, y, visited });
      }
      x -= steps;
    } else if (direction === "R") {
      const limit = y + steps;
      for (let a = y + 1; a <= limit; a++) {
        applyVisited({ x, y: a, visited });
      }
      y += steps;
    } else if (direction === "L") {
      const limit = y - steps;
      for (let a = y - 1; a > limit; a--) {
        applyVisited({ x, y: a, visited });
      }
      y -= steps;
    }

    currentPosition = { x, y };
  });

  return visited;
};

const calculateIntersections = ({ visitedWire1, visitedWire2 }) => {
  visitedWire1 = Object.keys(visitedWire1);
  visitedWire2 = Object.keys(visitedWire2);

  return visitedWire1.filter(element => visitedWire2.includes(element));
};

const calculateDistances = ({ intersections }) => {
  return intersections
    .map(element => {
      [x, y] = element.split(",");
      return { x: parseInt(x), y: parseInt(y) };
    })
    .map(({ x, y }) => x + y)
    .sort((a, b) => a - b);
};

const part1 = ({ wire1, wire2 }) => {
  const visitedWire1 = calculateVisited(wire1);
  const visitedWire2 = calculateVisited(wire2);

  const intersections = calculateIntersections({ visitedWire1, visitedWire2 });
  const distances = calculateDistances({ intersections });
  const [answer, ...rest] = distances;

  return answer;
};

const answer = part1({ wire1, wire2 });
console.log(`Part1 answer is: ${answer}`);
