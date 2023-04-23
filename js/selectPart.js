let selectState = {
    preload: preloadSelect,
    create: createSelect
};

function preloadSelect(){
    game.load.image('pA','assets/imgs/button_parta.png');
    game.load.image('pB','assets/imgs/button_partb.png');
    game.load.image('pC','assets/imgs/button_partc.png');
}

function createSelect(){
    let posX = GAME_STAGE_WIDTH / 2 - BUTTON_OFFSET_WIDTH;
    let posY = GAME_STAGE_HEIGHT / 2 - BUTTON_OFFSET_HEIGHT;
    btnPartA = game.add.button(posX, posY - BUTTON_OFFSETY_BETWEEN, 'pA', onButtonPressed);
    btnPartB = game.add.button(posX, posY, 'pB', onButtonPressed);
    btnPartC = game.add.button(posX, posY + BUTTON_OFFSETY_BETWEEN, 'pC', onButtonPressed);
}

function onButtonPressed(button) {
    if(button === btnPartA){
        game.state.start('partA');
    }
    else if( button === btnPartB){
        game.state.start('partB');
    }
    
}