const GAME_STAGE_WIDTH = 1000;
const GAME_STAGE_HEIGHT = 700;

let game = new Phaser.Game(GAME_STAGE_WIDTH, GAME_STAGE_HEIGHT, Phaser.CANVAS, 'gamestage');


window.onload = startGame;

function startGame() {
    game.state.add('startScreen', startState);
    game.state.add('selectPart',selectState);
    game.state.add('settings', settingsState);
    game.state.add('instructions', insState);
    game.state.add('partA', playAState);
    game.state.add('partB',playBState);
    

    game.state.start('startScreen');
}