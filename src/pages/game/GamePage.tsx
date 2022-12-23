import Board from '../../components/game/board/Board'
import GameHero from '../../components/game/gameHero/GameHero'
import GameController from '../../utils/class/GameController.class'

import './gamePage.css'

export default function GamePage() {
    return (
        <div className="game-wrapper">
            <GameHero player={GameController.getInstance().getTopPlayer()} />
            <Board />
            <GameHero player={GameController.getInstance().getBottomPlayer()} />
        </div>
    )
}