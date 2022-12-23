import './homeStyle.css'

export default function HomePage() {
    return (
        <div className="home-wrapper">
            <div className="title">
                <h1>WishStone</h1>
                <h1>WishStone</h1>
            </div>
            <button onClick={() => window.location.href = '#/game' }>PLAY !</button>
        </div>
    )
}
