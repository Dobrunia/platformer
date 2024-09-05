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
  const currentChar = charMap.get(parseInt(currentCharId, 10))
  const char = new Character(currentChar, currentLevel.playerStart.x, currentLevel.playerStart.y)
  const charElem = document.getElementById('character');
  charElem.style.left = `${char.position.x}px`;
  charElem.style.bottom = `${char.position.y}px`;
  let lifeTimer = null;
  const lifeCycle = () => {
    lifeTimer = setInterval(() => {
      switch (char.status) {
        case 'idle':
          console.log(char.status)
          charElem.style.backgroundImage = `url(/characters/${char.name}/${char.img.idle})`;
          break;
        case 'dead':
          clearInterval(lifeTimer);
          break;
        }
    }, 150)
  }
  // lifeCycle();
}
function generateMap(array: Array<object>) {
  const arrayMap = new Map();
  array.forEach(el => {
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
