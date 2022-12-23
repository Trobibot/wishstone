
import { useState, useCallback } from 'react'
import GameController from '../../../utils/class/GameController.class'
import { PlayerBoardPosition } from '../../../utils/enum/PlayerBoardPosition.enum'
import BoardLane from '../boardLane/BoardLane'
import GameStateDisplay from '../gameStateDisplay/GameStateDisplay'

import './board.css'

export default function Board() {

    const topPlayerCards    = GameController.getInstance().getTopPlayer().getDeck().getCards()
    const bottomPlayerCards = GameController.getInstance().getBottomPlayer().getDeck().getCards()

    const [, updateState] = useState(null);
    const forceUpdate = useCallback(() => {
        console.log(0)
        updateState(null)
    }, []);

    GameController.getInstance().subscribeToState(forceUpdate)

    return (
        <div className="board-wrapper" onClick={forceUpdate}>
            <BoardLane key="top"    position={PlayerBoardPosition.top}      cards={topPlayerCards} />
            <BoardLane key="bottom" position={PlayerBoardPosition.bottom}   cards={bottomPlayerCards} />
            <GameStateDisplay />
        </div>
    )
}