let playBState = {
    preload: preloadPartB,
    create: createPartB,
    update: updatePartA
};

function preloadPartB(){
    game.load.image('plus', 'assets/imgs/button_plus.png');
}

function createPartB(){
    createCharacter();
    createKeyControls();
    createThreads();
}

function updatePartB(){
    manageCharacterMovement();
}