"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runExperiment = void 0;
const pool_1 = require("./pool");
function runExperiment(numberOfPools = 1000, numberOfPeoplePerPool, numberOfPeopleSorted, luckAccount) {
    const pools = [];
    let averages = {
        AllPeople: { score: 0, luck: 0 },
        TopPeople: { score: 0, luck: 0 },
    };
    for (let index = 0; index < numberOfPools; index++) {
        let pool = new pool_1.Pool(numberOfPeoplePerPool, luckAccount);
        pools.push(pool);
        averages.AllPeople.score += pool.generateAverage();
        averages.AllPeople.luck += pool.generateAverage("AllPeople", "luckAverage");
        averages.TopPeople.score += pool.generateAverage("SortedPeople", "scoreAverage", numberOfPeopleSorted);
        averages.TopPeople.luck += pool.generateAverage("SortedPeople", "luckAverage", numberOfPeopleSorted);
    }
    const ScoreAverage = averages.AllPeople.score / numberOfPools;
    const LuckAverage = averages.AllPeople.luck / numberOfPools;
    const TopScoreAverage = averages.TopPeople.score / numberOfPools;
    const TopLuckAverage = averages.TopPeople.luck / numberOfPools;
    //   console.log("ScoreAverage:", ScoreAverage);
    //   console.log("LuckAverage:", LuckAverage);
    //   console.log("TopScoreAverage:", TopScoreAverage);
    //   console.log("TopLuckAverage:", TopLuckAverage);
    return { ScoreAverage, LuckAverage, TopScoreAverage, TopLuckAverage };
}
exports.runExperiment = runExperiment;
