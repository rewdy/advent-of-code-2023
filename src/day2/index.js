import { exampleData1, puzzleData } from "./data";

Array.prototype.sum = function () {
  return this.reduce((acc, item) => {
    if (isNaN(item)) throw Error("can't sum non-numbers!");
    return acc + Number(item);
  }, 0);
};

const sortOutData = (data) => {
  const lines = data.split("\n");
  const games = Object.fromEntries(
    lines.map((line) => {
      const [game, gameData] = line.split(":");
      const gameId = game.split(" ")[1];

      const hands = gameData
        .split(";")
        .map((g) => g.trim())
        .map((str) => {
          const groups = str.split(",").map((g) => g.trim());
          return Object.fromEntries(
            groups.map((g) => [g.split(" ")[1], Number(g.split(" ")[0])])
          );
        });

      return [gameId, hands];
    })
  );

  return games;
};

const evaluateGamesPt1 = (data, counts) => {
  const possibleGameIds = [];
  const maxRed = counts["red"] || 0;
  const maxBlue = counts["blue"] || 0;
  const maxGreen = counts["green"] || 0;
  // console.log(maxBlue, maxGreen, maxRed);
  Object.entries(data).forEach(([gameId, hands]) => {
    const possible = hands.every((hand, index) => {
      const handRed = hand["red"] || 0;
      const handBlue = hand["blue"] || 0;
      const handGreen = hand["green"] || 0;
      if (handRed > maxRed || handGreen > maxGreen || handBlue > maxBlue) {
        return false;
      }
      return true;
    });
    if (possible) {
      possibleGameIds.push(gameId);
    }
  });

  // console.log("Possible games", possibleGameIds);
  console.log("Possible id sum", possibleGameIds.sum());
};

const evaluateGamesPt2 = (data, counts) => {
  const gamePowers = [];
  Object.entries(data).forEach(([gameId, hands]) => {
    let redMin = 0,
      blueMin = 0,
      greenMin = 0;
    hands.forEach((hand) => {
      const red = hand["red"] || 0;
      const blue = hand["blue"] || 0;
      const green = hand["green"] || 0;
      redMin = Math.max(redMin, red);
      blueMin = Math.max(blueMin, blue);
      greenMin = Math.max(greenMin, green);
    });
    const mins = {
      red: redMin,
      blue: blueMin,
      green: greenMin,
    };
    const power = Object.values(mins).reduce((acc, n) => acc * n, 1);
    // console.log({ ...mins, power });
    gamePowers.push(power);
  });

  console.log("Powers added", gamePowers.sum());
};

const inTheBag = {
  red: 12,
  green: 13,
  blue: 14,
};
console.log("Part 1");
evaluateGamesPt1(sortOutData(exampleData1), inTheBag);
evaluateGamesPt1(sortOutData(puzzleData), inTheBag);

console.log("Part 2");
evaluateGamesPt2(sortOutData(exampleData1), inTheBag);
evaluateGamesPt2(sortOutData(puzzleData), inTheBag);
