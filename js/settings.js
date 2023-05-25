let settingsState = {
    preload: preloadSettings,
    create: createSettings,
};

function preloadSettings() {

    game.load.image('background', 'assets/imgs/Background.png');
    game.load.image('back', 'assets/imgs/button_back.png');
    game.load.image('plus', 'assets/imgs/button_plus.png');
    game.load.image('menus', 'assets/imgs/button_menus.png');
    game.load.image('kbd', 'assets/imgs/button_keyboard.png');
    game.load.image('mouse', 'assets/imgs/button_mouse.png');
}



let textNum;
let btnKeybd
let btnMouse
let styleT = {
    font: '25px Arial',
    fill: '#FF0000'
};

function createSettings() {

    let bg = game.add.sprite(0, 0, 'background');
    bg.scale.setTo(0.5, 0.5);

    let posX = GAME_STAGE_WIDTH / 2 - BUTTON_OFFSET_WIDTH;
    let posY = GAME_STAGE_HEIGHT / 2 - BUTTON_OFFSET_HEIGHT;
    btnbck = game.add.button(posX, posY + BUTTON_OFFSETY_BETWEEN * 2, 'back', clickBack);

    let textT = 'Threads number: \n\n\n';
    textT += 'Controls: ';


    let textThreads = game.add.text(GAME_STAGE_WIDTH / 4, GAME_STAGE_HEIGHT / 4, textT, styleT);

    posX = GAME_STAGE_WIDTH / 2;
    posY = GAME_STAGE_HEIGHT / 4;

    btnPlus = game.add.button(posX + 50, posY - 10, 'plus', modNumberThreads);
    btnMenus = game.add.button(posX - 50, posY - 10, 'menus', modNumberThreads);

    textNum = game.add.text(GAME_STAGE_WIDTH / 2 + 25, GAME_STAGE_HEIGHT / 4, numThreads, styleT);

    btnKeybd = game.add.button(posX - 120, posY + 50, 'kbd', controlSelection);
    btnMouse = game.add.button(posX + 100, posY + 50, 'mouse', controlSelection);

    btnKeybd.alpha = 1;
    btnMouse.alpha = 0.5;

}

function clickBack() {
    game.state.start('startScreen');
}

function modNumberThreads(button) {
    if (button === btnPlus & numThreads < 9) {
        numThreads += 1;

    } else if (button === btnMenus & numThreads > 3) {
        numThreads -= 1;
    }

    textNum.text = numThreads.toString();

    threadsArray = [];
    let offsetPosition = GAME_STAGE_WIDTH / (numThreads+1);
    for(let pos = 0; pos < numThreads; pos++){
        threadsArray.push(offsetPosition * (pos+1));
    }

    threadDistance = threadsArray[1]-threadsArray[0];
}

function controlSelection(button) {
    if (button === btnKeybd) {
        controls = 'keyboard';
        btnMouse.alpha = 0.5;
        btnMouse.input.enable = true;
        btnKeybd.alpha = 1;
        btnKeybd.input.enable = false;
        console.log("boton keyboard enable");
    } else {
        controls = 'mouse';
        btnMouse.alpha = 1;
        btnMouse.input.enable = false;
        btnKeybd.alpha = 0.5;
        btnKeybd.input.enable = true;
        console.log("boton mouse enable");
    }


}

