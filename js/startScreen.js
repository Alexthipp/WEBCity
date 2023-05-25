const BUTTON_OFFSETY_BETWEEN = 100;
const BUTTON_OFFSET_WIDTH = 102;
const BUTTON_OFFSET_HEIGHT = 37;
const TEXT_OFFSET_VER = 125;
const TEXT_OFFSET_HOR = 500;

let startState= {
    preload: preloadStart,
    create: createStart
};

var numThreads = 3;
var controls = 'keyboard';
var linkCharacter = 'assets/imgs/jinx.png';
var threadDistance = 250;

var threadsArray = [250,500,750];

function preloadStart() {
    game.load.image('background', '../assets/imgs/Background.png');
    game.load.image('play','assets/imgs/button_play.png');
    game.load.image('settings','assets/imgs/button_settings.png');
    game.load.image('instructions','assets/imgs/button_instructions.png');
}

function createStart() {
    let bg = game.add.sprite(0, 0, 'background');
    bg.scale.setTo(0.5, 0.5);
    let posX = GAME_STAGE_WIDTH / 2 - BUTTON_OFFSET_WIDTH;
    let posY = GAME_STAGE_HEIGHT / 2 - BUTTON_OFFSET_HEIGHT;
    btnPlay = game.add.button(posX, posY - BUTTON_OFFSETY_BETWEEN, 'play', clickPlay);
    btnInst = game.add.button(posX, posY, 'instructions', clickInstrunctions);
    btnStt = game.add.button(posX, posY + BUTTON_OFFSETY_BETWEEN, 'settings', clickSettings);

    let textC = 'Credits:\n';
    textC += 'Alejandro Toro Urdaneta\n';
    textC += 'Jesus Huguet Orosia';
    let styleC = {
        font: '25px Arial',
        fill: '#6100D5'
    };
    let credits = game.add.text((game.world.width-textC.length)/100, (game.world.height - TEXT_OFFSET_VER)/100, textC, styleC);
}

function clickPlay(){
    game.state.start('selectPart');
}

function clickInstrunctions(){
    game.state.start('instructions');
}

function clickSettings(){
    game.state.start('settings');
}