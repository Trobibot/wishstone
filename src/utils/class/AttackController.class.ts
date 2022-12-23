import Card from "./Card.class";
import Hero from "./Hero.class";

type Target = Card | Hero

export default class AttackController {

    private static instance: AttackController;

    private attacker!: Card;
    private target!: Target;

    private constructor() { }

    public static getInstance(): AttackController {
        if (!AttackController.instance)
        AttackController.instance = new AttackController()
        
        return AttackController.instance
    }

    public setAttacker(card: Card) {
        console.log('[ATTACK CONTROLLER] set attacker', card)

        this.attacker = card
    }

    public getAttacker(): Card {
        return this.attacker
    }

    public setTarget(target: Target) {
        console.log('[ATTACK CONTROLLER] set target', target)

        this.target = target
    }

    public getTarget(): Target {
        return this.target
    }

    public proccessFight() {
        const attackerDamage = this.attacker.getDamage()

        console.log('[ATTACK CONTROLLER] deal', attackerDamage, 'to target')

        this.target.removeHp(attackerDamage)
    }

}