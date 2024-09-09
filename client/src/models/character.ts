import { attackType, characterStatus } from '../types/types';

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
  private _canJump: number;
  private _dash: {
    cooldown: number;
  };
  private _img: {
    default: string;
  };
  private _position: {
    x: number;
    y: number;
  };
  private _isOnGround: boolean;
  private _status: characterStatus;
  private _gravity: number;
  constructor(charJson, startXpos: number, startYpos: number) {
    this._name = charJson.name;
    this._attack = charJson.attack;
    this._maxHealth = charJson.health;
    this._currentHealth = this._maxHealth;
    this._movespeed = charJson.movespeed;
    this._jumpPower = 200;
    this._canJump = 2;
    this._dash = charJson.dash;
    this._img = charJson.img;
    this._position = {
      x: startXpos,
      y: startYpos,
    };
    this._status = 'idle';
    this._isOnGround = true;
    this._gravity = 1.5;
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
  public set onGround(is: boolean) {
    this._isOnGround = is;
  }
  public takeDamage() {
    if (!this.isAlive()) return;
    this._currentHealth -= 1;
    if (!this._currentHealth) {
      this.killCharacter();
    }
  }
  public moveLeft() {
    if (!this.isAlive()) return;
    this._position.x -= this._movespeed;
    this._status = 'running';
  }
  public moveRight() {
    if (!this.isAlive()) return;
    this._position.x += this._movespeed;
    this._status = 'running';
  }
  public jump() {
    if (!this.isAlive()) return;
    if (this._canJump) {
      this._position.y += this._jumpPower;
      this._canJump -= 1;
      this._status = 'falling';
    }
  }
  public resetJump() {
    this._canJump = 2;
  }
  public applyGravity() {
    if (!this.isAlive()) return;
    if (!this._isOnGround) {
      this._position.y -= this._gravity;
    }
  }
  public killCharacter() {
    if (!this.isAlive()) return;
    this._currentHealth = 0;
    this._status = 'dead';
  }
  public isAlive(): boolean {
    if (this._status === 'dead') {
      console.log('персонаж мертв');
      return false;
    }
    return true;
  }
}
