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
    private _maxHealth: number;
    private _currentHealth: number;
    private _movespeed: number;
    private _jumpPower: number;
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
        this._maxHealth = charJson.health;
        this._currentHealth = this._maxHealth;
        this._movespeed = charJson.movespeed;
        this._jumpPower = 200;
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
    public get maxHealth() {
        return this._maxHealth;
    }
    public get currentHealth() {
        return this._currentHealth;
    }
    public get img() {
        return this._img;
    }
    public get position() {
        return this._position;
    }
    public get status() {
        return this._status;
    }
    public takeDamage() {
        this._currentHealth -= 1;
        if (!this._currentHealth) {
            this._status = "dead";
        }
    }
    public moveLeft() {
        this._position.x -= this._movespeed;
        this._status = "running";
    }
    public moveRight() {
        this._position.x += this._movespeed;
        this._status = "running";
    }
    public jump() {
        if (true) {
            this._position.y += this._jumpPower;
        }
    }
    public stop() {
        this._status = "idle";
    }
}
