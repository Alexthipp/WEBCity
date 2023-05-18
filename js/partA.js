const HUD_HEIGHT = 50;
const ROCKETS_GROUP_SIZE = 40;
const ROCKETS_OFFSET_Y = 10;
const ROCKETS_VELOCITY = 500;
const ENEMIES_GROUP_SIZE = 200;
const TIMER_RHYTHM = 0.1 * Phaser.Timer.SECOND;
const NUM_LEVELS = 3;
const LEVEL_ENEMIES_PROBABILITY = [0.2, 0.4, 0.6, 0.8, 1.0];
const LEVEL_ENEMIES_VELOCITY = [50, 100, 150, 200, 250];
const HITS_FOR_LEVEL_CHANGE = 50;

let cursors;
let fireButton;
let character;
let bugs;

let playAState = {
    preload: preloadPartA,
    create: createPartA,
    update: updatePartA
};

function preloadPartA() {
    game.load.image('plus', 'assets/imgs/button_plus.png');
    game.load.image('background', '../assets/imgs/Background.png');
    game.load.image('thread', '../assets/imgs/Thread.png');

}

function createPartA() {
    //EN UN FUTURO HABRA QUE CREAR CLASES DE ESTO PARA USARLO EN TODAS LAS PARTES
    //PARA CREAR CLASES HAY QUE CREAR UN .JS Y LUEGO INSERTARLO EN EL HTML
    //CLASES:
    //CHARACTER
    let bg = game.add.sprite(0, 0, 'background');
    bg.scale.setTo(0.5, 0.5);
    createCharacter();
    createKeyControls();
    //THREADS
    createThreads();
    /*
        //ROCKET
        createRocketBullet(ROCKETS_GROUP_SIZE);
        createSounds();
        //ENEMY
        createEnemies(ENEMIES_GROUP_SIZE);
        //HUD
        createHUD();*/
}

function createCharacter() {
    let theCharacter = game.add.sprite(0, 0, 'plus');
    character = new Character(0, theCharacter);

}

function createKeyControls() {
    cursors = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

function createThreads() {
    threadsArray.forEach(element => game.add.sprite(element, GAME_STAGE_HEIGHT / 2, 'thread'));
}

function createRocketBullet(number) {

}

function createSounds() {

}

function createEnemies(number) {

}

function createHUD() {

}

function updatePartA() {
    manageCharacterMovement();
}

function manageCharacterMovement() {
    if (controls == 'mouse') {
        if (game.input.speed.x < 0) {
            character.move('left');
        }
        else if (game.input.speed.x > 0) {
            character.move('right');
        }
    }
    else if (controls == 'keyboard') {
        if (cursors.left.justDown) {
            character.move('left');
        }
        else if (cursors.right.justDown) {
            character.move('right');
        }
    }
}