import { Cards } from './components/cards';
import './style.css';
import * as levelsArray from './state/levels.json';
import { Elements } from './components/elements';

const dashboard = document.getElementById('dashboard');

document.getElementById('play').addEventListener('click', (e) => {
  e.stopPropagation();
  renderLevels();
});

document.getElementById('characters').addEventListener('click', (e) => {
  e.stopPropagation();
  dfdfdf();
});

function renderLevels() {
  let content = '';
  levelsArray.default.forEach((level) => {
    content += Elements.getLevel(level.id);
  });
  dashboard.innerHTML = `
  <div class="nav-right-scroll w-full h-full bg-opacity9-backgroud flex flex-row flex-wrap items-center justify-center overflow-y-scroll">
    ${content}
  </div>`;
}

function dfdfdf() {
  let content = Cards.getActiveCard();
  content += Cards.getPurchasedCard();
  content += Cards.getDisabledCard();
  dashboard.innerHTML = `
    <div
                  class="nav-right-scroll w-full h-full bg-opacity9-backgroud flex flex-row flex-wrap items-center justify-center overflow-y-scroll"
                >
                ${content}
                  <!-- TODO:: при клике модально окно со статами  -->
                </div>
    `;
}
