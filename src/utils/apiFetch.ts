import axios from 'axios';

import Card from "./class/Card.class"

interface DBCard {
    id:     string,
    name:   string,
    hp:     number,
    damage: number,
    cost:   number,
}

export async function fetchCards() {
    const cards: Card[] = []
    for (let i = 0; i < 30; i++)
        cards.push(new Card(i, `Card #${i + 1}`, Math.ceil(Math.random() * 10), Math.ceil(Math.random() * 5), Math.ceil(Math.random() * 3)))
    return cards.sort(() => 0.5 - Math.random());

    // const { data } = await axios.get('')
    // return data.map((card: DBCard) => new Card(card.id, card.name, card.hp, card.damage, card.cost))
}