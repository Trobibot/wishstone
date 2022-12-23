export default class Card {

    private id:     string | number;
    private name:   string;
    private hp:     number;
    private damage: number;
    private cost:   number;

    constructor(id: string | number, name: string, hp: number, damage: number, cost: number) {
        this.id     = id;
        this.name   = name;
        this.hp     = hp;
        this.damage = damage;
        this.cost   = cost;
    }

    getId(): string | number {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getHp(): number {
        return this.hp;
    }

    removeHp(amount: number) {
        this.hp -= amount
    }

    getDamage(): number {
        return this.damage;
    }

    getManaCost(): number {
        return this.cost;
    }
}