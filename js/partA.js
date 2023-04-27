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
    create: createPartA
};

function preloadPartA(){

}

function createPartA(){
    
    //EN UN FUTURO HABRA QUE CREAR CLASES DE ESTO PARA USARLO EN TODAS LAS PARTES
    //CLASES:
    //CHARACTER
    createCharacter();
    createKeyControls();
    //ROCKET
    createRocketBullet(ROCKETS_GROUP_SIZE);
    createSounds();
    //ENEMIE
    createEnemies(ENEMIES_GROUP_SIZE);
    //HUD
    createHUD();
}

function createCharacter(){

}

function createKeyControls(){

}

function createRocketBullet(number){

}

function createSounds(){

}

function createEnemies(number){

}

function createHUD(){

}