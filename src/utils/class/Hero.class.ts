export default class Hero {

    private hp: number;

    constructor() {
        this.hp = 20;
    }

    getHp(): number {
        return this.hp;
    }

    removeHp(amount: number) {
        this.hp -= amount;
    }

}