export function returnPlayground(level) {
    return `
    <div class="level-wrapper" style="">
        <div class="level-container" style="background-image: url(/${level[0].background}); width: ${level[0].width}px; height: ${level[0].height}px;">
        </div>
    </div>
    `;
}