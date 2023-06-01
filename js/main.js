const GAME_STAGE_WIDTH = 1000;
const GAME_STAGE_HEIGHT = 700;
let game;

let wfConfig = {
    active: function () {
        startGame();
    },

    google: {
        families: ['Rammetto One', 'Sniglet', 'Indie Flower', 'Black Ops One', 'Press Start 2P']
    },
};

WebFont.load(wfConfig);


function startGame() {

    game = new Phaser.Game(GAME_STAGE_WIDTH, GAME_STAGE_HEIGHT, Phaser.CANVAS, 'gamestage')

    game.state.add('startScreen', startState);
    game.state.add('selectPart',selectState);
    game.state.add('settings', settingsState);
    game.state.add('instructions', insState);
    game.state.add('partA', playAState);
    game.state.add('partB',playBState);
    game.state.add('endScreen',endState);
    

    game.state.start('startScreen');
}