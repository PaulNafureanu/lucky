import fs from "fs";
import { runExperiment } from "./experiment";
// Options:
const numberOfPools = 1000;
const numberOfPeoplePerPool = 1000;
const numberOfPeopleSorted = (1.1 / 100) * numberOfPeoplePerPool;
let luckAccount = 5 / 100;
// let content: string = "";
let avg: number = 0;
let maxPercentage = 100;
let avgTopScore: number = 0;

for (let percentage = 0; percentage <= maxPercentage; percentage++) {
  luckAccount = percentage / 100;

  const { ScoreAverage, LuckAverage, TopScoreAverage, TopLuckAverage } =
    runExperiment(
      numberOfPools,
      numberOfPeoplePerPool,
      numberOfPeopleSorted,
      luckAccount
    );

  // content += `(${percentage}, ${TopLuckAverage}),`;
  avg += TopLuckAverage;
  avgTopScore += TopScoreAverage;

  console.log(`${percentage}%`);
}

console.log("AVG:", avg / (maxPercentage + 1));
console.log("AVG TOP:", avgTopScore / (maxPercentage + 1));

// console.log(content);

// fs.writeFile("result.txt", content, (err) => {
//   if (err) {
//     console.error("An error occurred while writing the file:", err);
//   } else {
//     console.log("File has been successfully written.");
//   }
// });
