"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pool = void 0;
const person_1 = require("./person");
class Pool {
    constructor(numberOfPeople = 1000, luckAccount = 0.05) {
        this.people = [];
        this.numberOfPeople = 0;
        this.sortedPeople = [];
        this.sortedBy = undefined;
        this.averages = {
            AllPeople: {
                skillAverage: -1,
                luckAverage: -1,
                scoreAverage: -1,
            },
            SortedPeople: {
                skillAverage: -1,
                luckAverage: -1,
                scoreAverage: -1,
            },
        };
        for (let index = 0; index < numberOfPeople; index++) {
            this.people.push(new person_1.Person(luckAccount));
        }
        this.numberOfPeople = numberOfPeople;
    }
    generateAverage(forWho = "AllPeople", averageType = "scoreAverage", numberOfPeopleSorted = 11) {
        if (this["averages"][forWho][averageType] > 0)
            return this["averages"][forWho][averageType];
        let total = 0;
        let average = 0;
        let personScoreType = "score";
        switch (averageType) {
            case "skillAverage": {
                personScoreType = "skill";
                break;
            }
            case "luckAverage": {
                personScoreType = "luck";
                break;
            }
            case "scoreAverage": {
                personScoreType = "score";
                break;
            }
            default: {
                const _neverTest = averageType;
            }
        }
        switch (forWho) {
            case "AllPeople": {
                this.people.forEach((person) => {
                    total += person[personScoreType];
                });
                average = total / this.numberOfPeople;
                break;
            }
            case "SortedPeople": {
                if (this.sortedPeople.length <= 0)
                    this.sortAndGetBestPeople(numberOfPeopleSorted, personScoreType);
                this.sortedPeople.forEach((person) => {
                    total += person[personScoreType];
                });
                average = total / this.sortedPeople.length;
                break;
            }
            default: {
                const _neverTest = forWho;
            }
        }
        this["averages"][forWho][averageType] = average;
        return this["averages"][forWho][averageType];
    }
    sortAndGetBestPeople(numberOfPeople = 11, criteria = "score") {
        if (this.sortedBy !== criteria || this.sortedPeople.length < numberOfPeople)
            this.people.sort((p1, p2) => p2[criteria] - p1[criteria]);
        this.sortedPeople = this.people.slice(0, numberOfPeople);
        return this.sortedPeople;
    }
}
exports.Pool = Pool;
