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

let playAState = {
    preload: preloadPartA,
    create: createPartA,
    update: updatePartA
};

function preloadPartA(){
    game.load.image('plus', 'assets/imgs/button_plus.png');

}

function createPartA(){
    //EN UN FUTURO HABRA QUE CREAR CLASES DE ESTO PARA USARLO EN TODAS LAS PARTES
    //PARA CREAR CLASES HAY QUE CREAR UN .JS Y LUEGO INSERTARLO EN EL HTML
    //CLASES:
    //CHARACTER
    createCharacter();
    //createKeyControls();
    //THREADS
    createThreads();/*
    //ROCKET
    createRocketBullet(ROCKETS_GROUP_SIZE);
    createSounds();
    //ENEMY
    createEnemies(ENEMIES_GROUP_SIZE);
    //HUD
    createHUD();*/
}

function createCharacter(){
    let theCharacter = game.add.sprite(0,0, 'plus');
    var character = new Character(0, theCharacter);

}

function createKeyControls(){

}

function createThreads(){
    threadsArray.forEach(element => game.add.sprite(element,GAME_STAGE_HEIGHT/2,'plus'));
}

function createRocketBullet(number){

}

function createSounds(){

}

function createEnemies(number){

}

function createHUD(){

}

function updatePartA(){

}