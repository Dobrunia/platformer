import './style.css';
import Character from './models/character';
import * as levelsArray from './state/levels.json';
import * as characters from './state/characters.json';
import { Component } from './components/components';

function startLevel(levelNumber) {
  const playground = document.getElementById('playground');
  const levelJson = levelsArray.default.map((level) => {
    return level.levelNumber === parseInt(levelNumber, 10) ? level : null;
  });
  playground.innerHTML = Component.playground(levelJson);
  const charElem = document.getElementById('character');
  localStorage.setItem('currentCharacter', 'Luminia');
  const charJson = characters.default.map((char) => {
    return char.name === localStorage.getItem('currentCharacter') ? char : null;
  });
  const char = new Character(charJson[0], levelJson[0].playerStart.x, levelJson[0].playerStart.y)
  charElem.style.backgroundImage = `url(/characters/${char.name}/${char.img.idle})`;
  charElem.style.left = `${char.position.x}px`;
  charElem.style.bottom = `${char.position.y}px`;

  const lifeCycle = () => {
    let lifeTimer = setInterval(() => {
      if(char) {
        
      }
    }, 150)
  }
  
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
