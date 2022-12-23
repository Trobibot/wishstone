import Player from '../../../utils/class/Player.class'

import './gameHero.css'

interface HeroProps {
    player: Player
}

export default function GameHero({ player }: HeroProps) {

    const hero = player.getHero()

    return (
        <div className="hero-wrapper">
            <span>Hero HP: {hero.getHp()}</span>
        </div>
    )
}