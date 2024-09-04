import * as characters from '../state/characters.json';

function returnCharacter(level) {
  localStorage.setItem('currentCharacter', 'Luminia');
  const char = characters.default.map((char) => {
    return char.name === localStorage.getItem('currentCharacter') ? char : null;
  });
  return `<div class="character" style="background-image: url(/characters/${
    char[0].name + '/' + char[0].img.default
  }); left: ${level.playerStart.x}px; bottom: ${level.playerStart.y}px"></div>`;
}

function returnLevelElements(level) {
  let elements = '';
  level.elements.forEach((element) => {
    elements += `
        <div class="element-wrapper" style="left: ${element.x}px; bottom: ${element.y}px; width: ${element.width}px; height: ${element.height}px;">
            
        </div>
        `;
  });
  return elements;
}

export function returnPlayground(level) {
  return `
    <div class="level-wrapper" style="">
        <div class="level-container" style="background-image: url(/${
          level[0].background
        }); width: ${level[0].width}px; height: ${level[0].height}px;">
        ${returnLevelElements(level[0])}
        ${returnCharacter(level[0])}
        </div>
    </div>
    `;
}
//<img class="element-img" src="/${element.image}" alt="">
