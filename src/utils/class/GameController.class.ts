import { fetchCards } from "../apiFetch";
import { GameState } from "../enum/GameState.enum";
import { PlayerBoardPosition } from "../enum/PlayerBoardPosition.enum";
import { PlayerEvent } from "../enum/PlayerEvent.enum";
import AttackController from "./AttackController.class";
import Card from "./Card.class";
import Deck from "./Deck.class";
import Hero from "./Hero.class";
import Player from "./Player.class";

type Target = Card | Hero

export default class GameController {

    private static instance: GameController;

    private turn!:          number;
    private currentPlayer!: number;
    private players:        Player[];
    private state:          GameState;

    private stateSubscriber: Function[] = [];

    private constructor() {
        this.players    = []
        this.state      = GameState.WaitForPLayerAction;
    }

    public static getInstance(): GameController {
        if (!GameController.instance)
            GameController.instance = new GameController()
        
        return GameController.instance
    }

    public async initGame() {

        const cards = await fetchCards()

        this.players.push(new Player("Player #1", new Deck("Deck #1", cards.slice(0, 3)), new Hero(), PlayerBoardPosition.top))
        this.players.push(new Player("Player #2", new Deck("Deck #2", cards.slice(3, 6)), new Hero(), PlayerBoardPosition.bottom))

        this.currentPlayer = 1

        return true
    }

    public emitPlayerEvent(eventType: PlayerEvent, target: Target) {
        switch (eventType) {

            case PlayerEvent.SelectCardInBottomLane:
                if (this.getCurrentPlayer().getPosition() === PlayerBoardPosition.top)
                    AttackController.getInstance().setTarget(target);

                if (this.getCurrentPlayer().getPosition() === PlayerBoardPosition.bottom)
                    AttackController.getInstance().setAttacker(target as Card);

                break;

            
            case PlayerEvent.SelectCardInTopLane:
                if (this.getCurrentPlayer().getPosition() === PlayerBoardPosition.top)
                    AttackController.getInstance().setAttacker(target as Card);

                if (this.getCurrentPlayer().getPosition() === PlayerBoardPosition.bottom)
                    AttackController.getInstance().setTarget(target);

                break;


            case PlayerEvent.SelectHero:
                AttackController.getInstance().setTarget(target);

                break;

            case PlayerEvent.ValidateAttacker:
                console.log('[ATTACK CONTROLLER] Validate attacker')
                this.setState(GameState.CardToAttackSelected);

                break;

            case PlayerEvent.ValidateTarget:
                console.log('[ATTACK CONTROLLER] Validate target')
                this.setState(GameState.TargetToAttackSelected);

                AttackController.getInstance().proccessFight();
                this.switchToOtherPlayer();

                console.log('[ATTACK CONTROLLER] Action ended...')
                this.setState(GameState.WaitForPLayerAction);

                break;

            // case PlayerEvent.SelectCardInHand:
                // this.placeCardOnBoard()
        }
    }

    public switchToOtherPlayer() {
        this.currentPlayer = this.currentPlayer === 0 ? 1 : 0;

        console.log('[GAME CONTROLLER] player', this.getCurrentPlayer().getName(), 'turn')
    }

    subscribeToState(callback: Function) {
        this.stateSubscriber.push(callback)
    }

    public getTopPlayer(): Player {
        return this.players[0];
    }

    public getBottomPlayer(): Player {
        return this.players[1];
    }

    public getState(): GameState {
        return this.state;
    }

    private setState(newState: GameState) {
        for (let callback of this.stateSubscriber)
            callback(this.state, newState)

        this.state = newState
    }

    public getCurrentPlayer(): Player {
        return this.players[this.currentPlayer];
    }

}