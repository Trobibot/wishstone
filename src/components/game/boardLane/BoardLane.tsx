import { useState } from 'react'
import Card from '../../../utils/class/Card.class'
import GameController from '../../../utils/class/GameController.class'
import { GameState } from '../../../utils/enum/GameState.enum'
import { PlayerBoardPosition } from '../../../utils/enum/PlayerBoardPosition.enum'
import { PlayerEvent } from '../../../utils/enum/PlayerEvent.enum'
import BoardCard from '../boardCard/BoardCard'

import './boardLane.css'

interface BoardLaneProps {
    cards:      Card[]
    position:   PlayerBoardPosition
}

export default function Lane({ cards, position }: BoardLaneProps) {

    // INIT COMPONENT

    let [areCardsSelectable, setCardsSelectability] = useState(proccessCardsSelectability(GameController.getInstance().getState()));
    let [selectedCard, setSelectedCard] = useState<Card | null>(null);

    GameController.getInstance().subscribeToState(watchGameState)

    // METHODS

    function watchGameState(oldState: GameState, newState: GameState) {
        setCardsSelectability(proccessCardsSelectability(newState))

        if (newState === GameState.WaitForPLayerAction)
            setSelectedCard(null)
    }

    function proccessCardsSelectability(gameState: GameState): boolean {
        const currentPlayer = GameController.getInstance().getCurrentPlayer()

        if (gameState === GameState.WaitForPLayerAction && currentPlayer.getPosition() === position) {
            return true
        }

        if (gameState === GameState.WaitForPLayerAction && currentPlayer.getPosition() !== position) {
            return false
        }

        if (gameState === GameState.CardToAttackSelected && currentPlayer.getPosition() === position) {
            return false
        }

        if (gameState === GameState.CardToAttackSelected && currentPlayer.getPosition() !== position) {
            return true
        }

        return false
    }

    function isCardSelected(card: Card) {
        return card.getId() === selectedCard?.getId() ?? false
    }

    function emitSelectedCard(card: Card): void {
        if (!areCardsSelectable)
            return

        const isPlayerAtSamePositionAsLane = GameController.getInstance().getCurrentPlayer().getPosition() === position
        let eventType

        if (!selectedCard || selectedCard.getId() !== card.getId()) {
            eventType = position === PlayerBoardPosition.top
                ? PlayerEvent.SelectCardInTopLane
                : PlayerEvent.SelectCardInBottomLane

        } else {
            eventType = isPlayerAtSamePositionAsLane
                ? PlayerEvent.ValidateAttacker
                : PlayerEvent.ValidateTarget
                
        }

        GameController.getInstance().emitPlayerEvent(eventType, card)
        setSelectedCard(card)

    }

    return (
        <div className={`board-lane-wrapper ${position ? 'top' : 'bottom'} ${areCardsSelectable ? 'selectable' : ''}`}>
            { cards.map(card =>
                <BoardCard
                    key={card.getId()}
                    card={card}
                    isSelected={isCardSelected(card)}
                    onSelected={ () => emitSelectedCard(card) }/>) }
        </div>
    )
}

