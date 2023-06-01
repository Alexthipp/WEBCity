
let endState= {
    preload: preloadEnd,
    create: createEnd,
    update: updatedEnd
};


let enter;

function preloadEnd() {
    game.load.image('background', 'assets/imgs/Background.png');
    game.load.image('back', 'assets/imgs/button_back.png');
    game.load.image('playAgain', 'assets/imgs/Playagaing.png');

}

function createEnd() {
    game.input.enabled = true;

    let bg = game.add.sprite(0, 0, 'background');
    bg.scale.setTo(0.5, 0.5);
    
    let resultText = game.add.text(500,250, 'YOU ' + result);
    resultText.anchor.setTo(0.5,0.5);

    let scoreText = game.add.text(resultText.x,resultText.y + 25,'Score: '+ score);
    scoreText.anchor.setTo(0.5,0.5);
    
    let timeText = game.add.text(scoreText.x,scoreText.y + 25,'Time: '+ time);
    timeText.anchor.setTo(0.5,0.5);

    let posX = GAME_STAGE_WIDTH / 2 - BUTTON_OFFSET_WIDTH;
    let posY = GAME_STAGE_HEIGHT / 2 - BUTTON_OFFSET_HEIGHT;
    btnbck = game.add.button(posX, posY + BUTTON_OFFSETY_BETWEEN * 2, 'back', clickBack);

    let btnPlayAgain = game.add.image(posX, posY + BUTTON_OFFSETY_BETWEEN, 'playAgain');

    enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

    game.time.events.add(20000, clickBack, this);
    
}

function updatedEnd(){
    if(enter.isDown){
        time = 0;
        score = 0;
        result = 'WIN';
        game.state.start('partA');
    }
}
