import * as levelsArray from '../state/levels.json';

function disabledCard() {
  return `<div class="character-card character-card_disabled">
                  <img class="absolute w-full top-0 left-0 z-10" src="/lock-and-chain.svg" alt="">
                  <img class="art w-full bg-cover" src="/menu.png" alt="" />
                  <div class="flex flex-col items-center justify-center">
                    <button
                      class="mb-[8px] rounded-md w-max h-max bg-btn-backgroud px-[8px] hover:text-acaccent"
                    >
                      Купить за
                      <span
                        class="text-gold-color"
                        ><img
                          class="diamond"
                          src="/diamond.svg"
                          alt=""
                        />3000</span
                      >
                    </button>
                    <button
                      class="mb-[8px] rounded-md w-max h-max bg-btn-backgroud px-[8px] hover:text-acaccent"
                      title="описание"
                    >
                      Характеристики
                    </button>
                  </div>
              </div>`;
}
function activeCard() {
  return `<div class="character-card character-card_active">
                  <img class="w-full" src="/characters/1.gif" alt="" />
                  <div class="flex flex-col items-center justify-center">
                    <button
                      class="mb-[8px] rounded-md w-max h-max bg-btn-backgroud px-[8px] hover:text-acaccent"
                      title="описание"
                    >
                      Характеристики
                    </button>
                  </div>
              </div>`;
}
function purchasedCard() {
  return `<div class="character-card">
                  <img class="w-full" src="/characters/1.gif" alt="" />
                  <div class="flex flex-col items-center justify-center">
                    <button
                      class="mb-[8px] rounded-md w-max h-max bg-btn-backgroud px-[8px] hover:text-acaccent"
                    >
                      Выбрать
                    </button>
                    <button
                      class="mb-[8px] rounded-md w-max h-max bg-btn-backgroud px-[8px] hover:text-acaccent"
                      title="описание"
                    >
                      Характеристики
                    </button>
                  </div>
                </div>`;
}
function level(levelNumber: number) {
  return `<div class="level" data-levelNumber="${levelNumber}">${levelNumber}</div>`;
}
function levels() {
  let content = '';
  levelsArray.default.forEach((el) => {
    content += level(el.levelNumber);
  });
  return `<div class="nav-right-scroll w-full h-full bg-opacity9-backgroud flex flex-row flex-wrap items-center justify-center overflow-y-scroll">
    ${content}
    </div>`;
}
function characters() {
  let content = activeCard();
  content += purchasedCard();
  content += disabledCard();
  return `<div class="nav-right-scroll w-full h-full bg-opacity9-backgroud flex flex-row flex-wrap items-center justify-center overflow-y-scroll">
            ${content}
            <!-- TODO:: при клике модально окно со статами  -->
        </div>`;
}
function character() {
  return `<div class="character" id="character"></div>`;
}
function levelElements(level) {
  let elements = '';
  level.elements.forEach((element) => {
    elements += `
          <div class="element-wrapper" data-type="${element.type}" style="left: ${element.x}px; bottom: ${element.y}px; width: ${element.width}px; height: ${element.height}px;"></div>`;
  });
  return elements;
}
function playground(level) {
  return `
      <div class="level-wrapper" style="">
          <div class="level-container" style="background-image: url(/${
            level.background
          }); width: ${level.width}px; height: ${level.height}px;">
          ${levelElements(level)}
          ${character()}
          </div>
          ${interfaceFooter()}
      </div>`;
}
function interfaceFooter() {
    return `
    <div class="interface">
        <div class="hearts" id="hearts"></div>
    </div>
    `;
}
//<img class="element-img" src="/${element.image}" alt="">

export const Component = {playground, levels, characters};
