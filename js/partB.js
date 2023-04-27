let playBState = {
    preload: preloadPartB,
    create: createPartB
};

function preloadPartB(){
    game.load.image('plus', 'assets/imgs/button_plus.png');
}

function createPartB(){
    createThreads();
}