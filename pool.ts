import { Person, PersonScoreType } from "./person";

export type PoolAverageType = "skillAverage" | "luckAverage" | "scoreAverage";

interface PoolAverage {
  AllPeople: {
    [key in PoolAverageType]: number;
  };
  SortedPeople: {
    [key in PoolAverageType]: number;
  };
}

export class Pool {
  readonly people: Person[] = [];
  readonly numberOfPeople: number = 0;
  private sortedPeople: Person[] = [];
  private sortedBy: PersonScoreType | undefined = undefined;
  private averages: PoolAverage = {
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

  constructor(numberOfPeople: number = 1000, luckAccount: number = 0.05) {
    for (let index = 0; index < numberOfPeople; index++) {
      this.people.push(new Person(luckAccount));
    }
    this.numberOfPeople = numberOfPeople;
  }

  generateAverage(
    forWho: "AllPeople" | "SortedPeople" = "AllPeople",
    averageType: PoolAverageType = "scoreAverage",
    numberOfPeopleSorted: number = 11
  ) {
    if (this["averages"][forWho][averageType] > 0)
      return this["averages"][forWho][averageType];

    let total = 0;
    let average = 0;
    let personScoreType: PersonScoreType = "score";

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
        const _neverTest: never = averageType;
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
        const _neverTest: never = forWho;
      }
    }

    this["averages"][forWho][averageType] = average;
    return this["averages"][forWho][averageType];
  }

  sortAndGetBestPeople(
    numberOfPeople: number = 11,
    criteria: PersonScoreType = "score"
  ) {
    if (this.sortedBy !== criteria || this.sortedPeople.length < numberOfPeople)
      this.people.sort((p1, p2) => p2[criteria] - p1[criteria]);

    this.sortedPeople = this.people.slice(0, numberOfPeople);

    return this.sortedPeople;
  }
}
