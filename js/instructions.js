let insState = {
    preload: preloadInst,
    create: createInst
};

function preloadInst(){
    game.load.image('back','assets/imgs/button_back.png');
}

function createInst(){
    let posX = GAME_STAGE_WIDTH / 2 - BUTTON_OFFSET_WIDTH;
    let posY = GAME_STAGE_HEIGHT / 2- BUTTON_OFFSET_HEIGHT;
    btnbck = game.add.button(posX, posY + BUTTON_OFFSETY_BETWEEN *2 , 'back', clickBack);
}

function clickBack(){
    game.state.start('startScreen');
}