import { characterStatus } from './types/types';
import './style.css';
import Character from './models/character';
import * as levelsArray from './state/levels.json';
import * as characters from './state/characters.json';
import { Component } from './components/components';

const currentCharId = 1;

function startLevel(levelNumber) {
  const levelsMap = generateMap(levelsArray.default);
  const currentLevel = levelsMap.get(parseInt(levelNumber, 10));
  const playground = document.getElementById('playground');
  playground.innerHTML = Component.playground(currentLevel);
  const charMap = generateMap(characters.default);
  const currentChar = charMap.get(parseInt(currentCharId, 10));
  const char = new Character(
    currentChar,
    currentLevel.playerStart.x,
    currentLevel.playerStart.y,
  );
  function gameLoop() {
    const charElem = document.getElementById('character');

    if (isMovingLeft) {
      char.moveLeft();
    }

    if (isMovingRight) {
      char.moveRight();
    }

    if (!isMovingLeft && !isMovingRight && char.status !== 'idle') {
      char.stop();
    }

    // Рендерим текущую позицию персонажа и его здоровье
    renderCharacterPosition(char, charElem);
    renderCurrentHealth(char);

    // Проверяем статус для переключения анимации
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
        // Можно добавить логику при смерти
        break;
      default:
        break;
    }
  }
  // Инициализация
  let isMovingLeft = false;
  let isMovingRight = false;
  let isJumping = false;
  function addPlayerListeners(char) {
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
      requestAnimationFrame(gameLoop);
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

      if (!isMovingLeft && !isMovingRight) {
        char.stop();
      }
      requestAnimationFrame(gameLoop);
    });
  }
  addPlayerListeners(char);
  // let lifeTimer = null;
  // const lifeCycle = () => {
  //   addPlayerListeners(char);
  //   lifeTimer = setInterval(() => {
  //     const charElem = document.getElementById('character');
  //     switch (char.status) {
  //       case 'idle':
  //         console.log(char.status);
  //         charElem.style.backgroundImage = `url(/characters/${char.name}/${char.img.idle})`;
  //         break;
  //       case 'running':
  //         console.log(char.status);

  //         break;
  //       case 'dead':
  //         clearInterval(lifeTimer);
  //         break;
  //     }
  //     renderCharacterPosition(char, charElem);
  //     renderCurrentHealth(char);
  //   }, 150);
  // };
  // lifeCycle();
}
function renderCharacterPosition(char, charElem) {
  charElem.style.left = `${char.position.x}px`;
  charElem.style.bottom = `${char.position.y}px`;
}
function playerTakesDamage(char) {
  char.takeDamage();
  renderCurrentHealth(char);
  if (char.status === 'dead') {
    alert('Вы погибли');
  }
}
function renderCurrentHealth(char: Character) {
  const hearts = document.getElementById('hearts');
  hearts.innerHTML = '';
  for (let i = 0; i < char.currentHealth; i++) {
    hearts.innerHTML += `<img src="/heart.svg" alt=""/>`;
  }
  for (let i = 0; i < char.maxHealth - char.currentHealth; i++) {
    hearts.innerHTML += `<img src="/empty-heart.svg" alt=""/>`;
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

  //   const removeEventListeners = () => {
  //     if (playButton) {
  //       playButton.removeEventListener('click', playButtonHandler);
  //     }

  //     if (charactersButton) {
  //       charactersButton.removeEventListener('click', charactersButtonHandler);
  //     }
  //   };

  //   setTimeout(() => {
  //     removeEventListeners();
  //     console.log('Обработчики событий удалены');
  //   }, 10000);
});
