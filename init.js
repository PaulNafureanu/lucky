"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const experiment_1 = require("./experiment");
// Options:
const numberOfPools = 1000;
const numberOfPeoplePerPool = 1000;
const numberOfPeopleSorted = (1.1 / 100) * numberOfPeoplePerPool;
let luckAccount = 5 / 100;
let content = "";
for (let percentage = 0; percentage <= 100; percentage++) {
    luckAccount = percentage / 100;
    const { ScoreAverage, LuckAverage, TopScoreAverage, TopLuckAverage } = (0, experiment_1.runExperiment)(numberOfPools, numberOfPeoplePerPool, numberOfPeopleSorted, luckAccount);
    content += `(${percentage}, ${TopLuckAverage}),`;
    console.log(`${percentage}%`);
}
console.log(content);
fs_1.default.writeFile("result.txt", content, (err) => {
    if (err) {
        console.error("An error occurred while writing the file:", err);
    }
    else {
        console.log("File has been successfully written.");
    }
});
