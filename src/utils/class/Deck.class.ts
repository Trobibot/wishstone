import Card from './Card.class'

export default class Deck {

    private name: string;
    private cards: Card[];

    constructor(name: string, cards: Card[]) {
        this.name = name;
        this.cards = cards;
    }

    public getCards(): Card[] {
        return this.cards;
    }

    public addCard(card: Card) {
        this.cards.push(card)
    }

    public removeCard(card: Card) {
        const cardIndex = this.cards.indexOf(card)
        this.cards.slice(cardIndex, 1)
    }

    public isCompleted(): boolean {
        return true;
        // return this.cards.length === 6
    }

}