export type PersonScoreType = "skill" | "luck" | "score";

export class Person {
  score: number = 0;
  luck: number = 0;
  skill: number = 0; //skill, experience, hard work.

  constructor(luckAccount: number = 0.05) {
    this.luck = this.generateLuckScore();
    this.skill = this.generateSkillScore();
    this.score = this.luck * luckAccount + this.skill * (1 - luckAccount);
  }

  private generateLuckScore() {
    return Math.random() * 100;
  }

  private generateSkillScore() {
    return Math.random() * 100;
  }
}
