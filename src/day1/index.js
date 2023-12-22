import { exampleData1, exampleData2, puzzleData } from "./data.js";

const wordNumberMap = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

String.prototype.indexOfAll = function(term) {
  const foundIndexes = [];
  let searchStart = 0;
  while (searchStart > -1) {
    const result = this.indexOf(term, searchStart);
    if (result > -1) {
      foundIndexes.push(result);
      searchStart = result + 1;
    } else {
      searchStart = -1;
    }
  }
  return foundIndexes;
}
String.prototype.replaceAt = function (search, replacement, index = 0) {
  return (
    this.substring(0, index) +
    this.substring(index).replace(search, replacement)
  );
};

const findDirectional = (line, dir = "left") => {
  // If the first or last is a number, just return them straight away.
  if (dir === "right" && !isNaN(line[line.length - 1])) {
    return line[line.length - 1];
  } else if (dir === "left" && !isNaN(line[0])) {
    return line[0];
  }

  // now do more complex stuff
  let newLine = `${line}`;
  const found = [];
  Object.entries(wordNumberMap).forEach(([key, num]) => {
    const foundIndexes = line.indexOfAll(key);
    if (foundIndexes.length > 0) {
      foundIndexes.forEach((foundIndex) => {
        found.push([key, foundIndex, num]);
      })
    }
  });

  if (found.length > 0) {
    if (dir === "right") {
      found.sort((a, b) => (a[1] < b[1] ? 1 : -1));
    } else {
      found.sort((a, b) => (a[1] > b[1] ? 1 : -1));
    }

    // only replace the first found since we only really care about the first/last
    const [key, foundIndex, num] = found[0];
    newLine = newLine.replaceAt(key, num, foundIndex);
  }

  const asArray =
    dir === "right" ? newLine.split("").reverse() : newLine.split("");
  return asArray.find((char) => !isNaN(char));
};

const findSum = (data) => {
  const lines = data.split("\n");
  const numberLines = lines.map((line) => {
    const first = findDirectional(line, "left");
    const last = findDirectional(line, "right");
    return Number(`${first}${last}`);
  });

  // for (let i = 0; i < 50; i++) {
  //   console.log(lines[i], numberLines[i])
  // }

  // console.log(numberLines);
  const sum = numberLines.reduce((acc, num) => acc + num, 0);
  console.log(sum);
  return sum;
};

findSum(exampleData1);
findSum(exampleData2);
findSum(puzzleData);
