import './style.css';
import Character from './models/character';
import * as levelsArray from './state/levels.json';
import * as characters from './state/characters.json';
import { Component } from './components/components';

const currentCharId = 1; //потом поменять
let char: Character;
let isMovingLeft = false;
let isMovingRight = false;
let isJumping = false;
function startLevel(levelNumber) {
  const levelsMap = generateMap(levelsArray.default);
  const currentLevel = levelsMap.get(parseInt(levelNumber, 10));
  const playground = document.getElementById('playground');
  playground.innerHTML = Component.playground(currentLevel);
  const charMap = generateMap(characters.default);
  const currentChar = charMap.get(currentCharId);
  char = new Character(
    currentChar,
    currentLevel.playerStart.x,
    currentLevel.playerStart.y,
  );
  addPlayerListeners();
  requestAnimationFrame(gameLoop);
}
function addPlayerListeners() {
  document.addEventListener('keydown', (event) => {
    event.preventDefault();
    switch (event.code) {
      case 'KeyA':
        isMovingLeft = true;
        break;
      case 'KeyD':
        isMovingRight = true;
        break;
      case 'Space':
        if (!isJumping) {
          isJumping = true;
        }
        break;
      default:
        break;
    }
  });
  document.addEventListener('keyup', (event) => {
    switch (event.code) {
      case 'KeyA':
        isMovingLeft = false;
        break;
      case 'KeyD':
        isMovingRight = false;
        break;
      case 'Space':
        isJumping = false;
        break;
      default:
        break;
    }
  });
}
function gameLoop() {
  if (isMovingLeft) {
    char.moveLeft();
  }
  if (isMovingRight) {
    char.moveRight();
  }
  if (isJumping) {
    char.jump();
  }
  renderCharInfo();
  checkFalling();
  requestAnimationFrame(gameLoop);
}
function checkFalling() {
  const charElem = document.getElementById('character');
  let centerX;
  let centerY;
  if (charElem) {
    const rect = charElem.getBoundingClientRect();
    centerX = rect.left + rect.width / 2;
    centerY = rect.top + rect.height / 2;
    const elementBelow = document.elementFromPoint(centerX, centerY + 51);
    if (elementBelow) {
      const belowAttribute = elementBelow.getAttribute('data-type');
      if (!belowAttribute) {
        console.log('падаем');
      }
      if (belowAttribute === 'ground' || belowAttribute === 'platform') {
        console.log('не падаем');
      }
    } else {
      console.log('Элемент под персонажем не найден.');
    }
  } else {
    console.log('Персонаж не найден.');
  }
}
function playerTakesDamage() {
  char.takeDamage();
  if (char.status === 'dead') {
    alert('Вы погибли');
  }
}
function renderCharInfo() {
  setCharImg();
  renderCharacterPosition();
  renderCharCurrentHealth();
}
function renderCharacterPosition() {
  const charElem = document.getElementById('character');
  charElem.style.left = `${char.position.x}px`;
  charElem.style.bottom = `${char.position.y}px`;
}
function renderCharCurrentHealth() {
  const hearts = document.getElementById('hearts');
  hearts.innerHTML = '';
  for (let i = 0; i < char.currentHealth; i++) {
    hearts.innerHTML += `<img src="/heart.svg" alt=""/>`;
  }
  for (let i = 0; i < char.maxHealth - char.currentHealth; i++) {
    hearts.innerHTML += `<img src="/empty-heart.svg" alt=""/>`;
  }
}
function setCharImg() {
  const charElem = document.getElementById('character');
  switch (char.status) {
    case 'idle':
      charElem.style.backgroundImage = `url(/characters/${char.name}/${char.img.idle})`;
      break;
    case 'running':
      //charElem.style.backgroundImage = `url(/characters/${char.name}/${char.img.running})`;
      break;
    case 'falling':
      //charElem.style.backgroundImage = `url(/characters/${char.name}/${char.img.jumping})`;
      break;
    case 'dead':
      break;
    default:
      break;
  }
}
function generateMap(array: Array<object>) {
  const arrayMap = new Map();
  array.forEach((el) => {
    arrayMap.set(el.id, el);
  });
  return arrayMap;
}

document.addEventListener('DOMContentLoaded', () => {
  const dashboard = document.getElementById('dashboard');
  const playButton = document.getElementById('play');
  const charactersButton = document.getElementById('characters');
  const playButtonHandler = (e) => {
    e.stopPropagation();
    dashboard.innerHTML = Component.levels();
    const levels = [...document.getElementsByClassName('level')];
    levels.forEach((level) => {
      level.addEventListener('click', () =>
        startLevel(level.getAttribute('data-levelNumber')),
      );
    });
  };
  const charactersButtonHandler = (e) => {
    e.stopPropagation();
    dashboard.innerHTML = Component.characters();
  };
  if (playButton) {
    playButton.addEventListener('click', playButtonHandler);
  }
  if (charactersButton) {
    charactersButton.addEventListener('click', charactersButtonHandler);
  }
});
