let settingsState = {
    preload: preloadSettings,
    create: createSettings
};

function preloadSettings(){
    game.load.image('back','assets/imgs/button_back.png');
}

function createSettings(){
    let posX = GAME_STAGE_WIDTH / 2 - BUTTON_OFFSET_WIDTH;
    let posY = GAME_STAGE_HEIGHT / 2- BUTTON_OFFSET_HEIGHT;
    btnbck = game.add.button(posX, posY + BUTTON_OFFSETY_BETWEEN *2 , 'back', clickBack);
}

function clickBack(){
    game.state.start('startScreen');
}