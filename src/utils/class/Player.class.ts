import { PlayerBoardPosition } from "../enum/PlayerBoardPosition.enum";
import Deck from "./Deck.class";
import Hero from "./Hero.class";

export default class Player {

    private name: string;
    private deck: Deck;
    private hero: Hero;
    private position: PlayerBoardPosition;

    constructor(name: string, deck: Deck, hero: Hero, position: PlayerBoardPosition) {
        this.name = name;
        this.deck = deck;
        this.hero = hero;
        this.position = position;
    }

    getName(): string {
        return this.name;
    }

    getDeck(): Deck {
        return this.deck;
    }
    
    getHero(): Hero {
        return this.hero;
    }

    getPosition(): PlayerBoardPosition {
        return this.position;
    }

}