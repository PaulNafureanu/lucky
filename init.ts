import fs from "fs";
import { runExperiment } from "./experiment";
// Options:
const numberOfPools = 1000;
const numberOfPeoplePerPool = 1000;
const numberOfPeopleSorted = (1.1 / 100) * numberOfPeoplePerPool;
let luckAccount = 5 / 100;
let content: string = "";

for (let percentage = 0; percentage <= 100; percentage++) {
  luckAccount = percentage / 100;

  const { ScoreAverage, LuckAverage, TopScoreAverage, TopLuckAverage } =
    runExperiment(
      numberOfPools,
      numberOfPeoplePerPool,
      numberOfPeopleSorted,
      luckAccount
    );

  content += `(${percentage}, ${TopLuckAverage}),`;
  console.log(`${percentage}%`);
}

console.log(content);

fs.writeFile("result.txt", content, (err) => {
  if (err) {
    console.error("An error occurred while writing the file:", err);
  } else {
    console.log("File has been successfully written.");
  }
});
