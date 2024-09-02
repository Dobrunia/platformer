function getDisabledCard() {
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

function getActiveCard() {
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

function getPurchasedCard() {
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

export const Cards = {
  getDisabledCard,
  getActiveCard,
  getPurchasedCard,
};
