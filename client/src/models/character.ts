import { attackType } from "../types/types";

export default class Character {
    private _name: string;
    private _attack: {
        type: attackType;
        damage: number;
        range: number;
        cooldown: number;
        duration: number;
        speed: number;
    };
    private _health: number;
    private _movespeed: number;
    private _dash: {
        cooldown: number;
    };
    private _img: {
        default: string;
    };
    constructor(char) {
        this._name = char.name;
        this._attack = char.attack;
        this._health = char.health;
        this._movespeed = char.movespeed;
        this._dash = char.dash;
        this._img = char.img;
    }

    public get name(): string {
        return this._name;
    }

    public get attack(): attackType {
        return this._attack.type;
    }
    
}
