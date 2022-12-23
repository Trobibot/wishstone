import axios, { AxiosResponse } from 'axios';

import Card from "./class/Card.class"

interface DBCard {
  id:       string,
  name:     string,
  hp:       number,
  damage:   number,
  cost:     number,
  artwork:  string
}

export async function fetchCards() {
  const resp:   AxiosResponse = await axios.get('https://eenscg1z.directus.app/items/card')
  const data:   DBCard[]      = resp.data.data
  const cards:  Card[]        = []

  for (const card of data)
    cards.push(new Card(card.id, card.name, card.hp, card.damage, card.cost))

  return cards
}