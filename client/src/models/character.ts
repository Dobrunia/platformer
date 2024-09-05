import { attackType, characterStatus } from "../types/types";

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
    private _position: {
        x: number;
        y: number;
    }
    private _status: characterStatus;
    constructor(charJson, startXpos: number, startYpos: number) {
        this._name = charJson.name;
        this._attack = charJson.attack;
        this._health = charJson.health;
        this._movespeed = charJson.movespeed;
        this._dash = charJson.dash;
        this._img = charJson.img;
        this._position = {
            x: startXpos,
            y: startYpos,
        };
        this._status = "idle";
    }

    public get name() {
        return this._name;
    }

    public get img() {
        return this._img;
    }

    public get position() {
        return this._position;
    }
}
