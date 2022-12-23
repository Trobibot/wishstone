import Card from '../../../utils/class/Card.class'

import './boardCard.css'

interface CardProps {
    card:       Card,
    isSelected: boolean,
    onSelected: Function
}

export default function BoardCard({ card, isSelected, onSelected }: CardProps) {
    return (
        <div
            className={`board-card-wrapper ${isSelected ? 'selected' : ''}`}
            onClick={() => onSelected()}
        >

            <div className='card-attribute'>
                <span>Name:</span>
                <span>{ card.getName() }</span>
            </div>

            <div className='card-attribute'>
                <span>HP:</span>
                <span>{ card.getHp() }</span>
            </div>

            <div className='card-attribute'>
                <span>Damage:</span>
                <span>{ card.getDamage() }</span>
            </div>
            
            <div className='card-attribute'>
                <span>Mana cost:</span>
                <span>{ card.getManaCost()}</span>
            </div>
        </div>
    )
}

