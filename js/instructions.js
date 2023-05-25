let insState = {
    preload: preloadInst,
    create: createInst
};

function preloadInst(){

    game.load.image('background', 'assets/imgs/Background.png');
    game.load.image('back','assets/imgs/button_back.png');
}

function createInst(){

    let bg = game.add.sprite(0, 0, 'background');
    bg.scale.setTo(0.5, 0.5);

    let posX = GAME_STAGE_WIDTH / 2 - BUTTON_OFFSET_WIDTH;
    let posY = GAME_STAGE_HEIGHT / 2- BUTTON_OFFSET_HEIGHT;
    btnbck = game.add.button(posX, posY + BUTTON_OFFSETY_BETWEEN *2 , 'back', clickBack);
}

function clickBack(){
    game.state.start('startScreen');
}