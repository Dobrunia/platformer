import * as levelsArray from '../state/levels.json';
import { Elements } from './elements';
import { Cards } from './cards';

function levels() {
  let content = '';
  levelsArray.default.forEach((level) => {
    content += Elements.getLevel(level.levelNumber);
  });
  return `<div class="nav-right-scroll w-full h-full bg-opacity9-backgroud flex flex-row flex-wrap items-center justify-center overflow-y-scroll">
    ${content}
    </div>`;
}

function characters() {
  let content = Cards.getActiveCard();
  content += Cards.getPurchasedCard();
  content += Cards.getDisabledCard();
  return `<div class="nav-right-scroll w-full h-full bg-opacity9-backgroud flex flex-row flex-wrap items-center justify-center overflow-y-scroll">
            ${content}
            <!-- TODO:: при клике модально окно со статами  -->
        </div>`;
}

export const ReturnWindow = {
  levels,
  characters,
};
