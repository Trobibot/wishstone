import { useState } from 'react'
import GameController from '../../../utils/class/GameController.class'
import { GameState } from '../../../utils/enum/GameState.enum'
import './gameStateDisplay.css'

export default function GamePage() {

    let [gameState, setGameState] = useState(parseGameState(GameState.WaitForPLayerAction))

    function parseGameState(gameState: GameState): string {
        if (gameState === GameState.WaitForPLayerAction)
            return 'Select an attacker'

        if (gameState === GameState.CardToAttackSelected)
            return 'Select a traget'

        return '';
    }


    GameController.getInstance().subscribeToState(
        (oldState: GameState, newState: GameState) => {
            setGameState(parseGameState(newState))
        })

    return (
        <div className="game-state-wrapper">
            <span>{ gameState }</span>
        </div>
    )
}