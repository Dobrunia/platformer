import './style.css';
import { ReturnWindow } from './components/menuWindows';
import { returnPlayground } from './components/playground';
import * as levelsArray from './state/levels.json';

function startLevel(levelNumber) {
  const playground = document.getElementById('playground');
  playground.innerHTML = returnPlayground(
    levelsArray.default.map((level) => {
      return level.levelNumber === parseInt(levelNumber, 10) ? level : null;
    }),
  );
  //отслеживание кнопок
}

document.addEventListener('DOMContentLoaded', () => {
  const dashboard = document.getElementById('dashboard');
  const playButton = document.getElementById('play');
  const charactersButton = document.getElementById('characters');

  const playButtonHandler = (e) => {
    e.stopPropagation();
    dashboard.innerHTML = ReturnWindow.levels();
    const levels = [...document.getElementsByClassName('level')];
    levels.forEach((level) => {
      level.addEventListener('click', () =>
        startLevel(level.getAttribute('data-levelNumber')),
      );
    });
  };

  const charactersButtonHandler = (e) => {
    e.stopPropagation();
    dashboard.innerHTML = ReturnWindow.characters();
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
