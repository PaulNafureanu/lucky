"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Person = void 0;
class Person {
    constructor(luckAccount = 0.05) {
        this.score = 0;
        this.luck = 0;
        this.skill = 0; //skill, experience, hard work.
        this.luck = this.generateLuckScore();
        this.skill = this.generateSkillScore();
        this.score = this.luck * luckAccount + this.skill * (1 - luckAccount);
    }
    generateLuckScore() {
        return Math.random() * 100;
    }
    generateSkillScore() {
        return Math.random() * 100;
    }
}
exports.Person = Person;
