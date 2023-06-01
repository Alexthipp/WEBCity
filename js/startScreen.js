const BUTTON_OFFSETY_BETWEEN = 100;
const BUTTON_OFFSET_WIDTH = 102;
const BUTTON_OFFSET_HEIGHT = 37;
const TEXT_OFFSET_VER = 125;
const TEXT_OFFSET_HOR = 500;

let startState= {
    preload: preloadStart,
    create: createStart
};

let result = 'WIN';
let score;


let stateName;
let numThreads = 3;
let controls = 'keyboard';
let linkCharacter = 'assets/imgs/jinx.png';
let linkBulletSound = 'assets/snds/jinxShoot.wav';
let linkBulletPng = 'assets/imgs/spritesheetBulletJinx.png';
let linkBulletJson = 'assets/jsons/spritesheetBulletJinx.json';
let animbulletvelocity = 44;

let time;

let threadDistance = 250;

let threadsArray = [250,500,750];

let musicNP;
let btnSnd;
let msplaying = false;

function preloadStart() {
    game.load.image('background', '../assets/imgs/Background.png');
    game.load.image('play','assets/imgs/button_play.png');
    game.load.image('settings','assets/imgs/button_settings.png');
    game.load.image('instructions','assets/imgs/button_instructions.png');

    game.load.audio('bckmusic','assets/snds/backgroundMusicNotPlaying.mp3');
    game.load.audio('bttnSnd','assets/snds/Button.wav');
}

function createStart() {
    time = 0;
    score = 0;

    
    if(!msplaying){
        musicNP = game.sound.add('bckmusic',0.05,true);
        msplaying = true;
        musicNP.play();
    }

    btnSnd = game.sound.add('bttnSnd',0.05);

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
        font: 'Indie Flower',
        fontSize: '24px',
        fontStyle: 'bold',
        fill: '#FFC100',
        align: 'center'
    };

    let credits = game.add.text(game.world.width/2, game.world.height - TEXT_OFFSET_VER, textC, styleC);
    credits.anchor.setTo(0.5,0.5);
}

function clickPlay(){
    btnSnd.play();
    game.state.start('selectPart');
}

function clickInstrunctions(){
    
    btnSnd.play();
    game.state.start('instructions');
}

function clickSettings(){
    
    btnSnd.play();
    game.state.start('settings');
}