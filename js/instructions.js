let insState = {
    preload: preloadInst,
    create: createInst
};

function preloadInst(){

    game.load.image('background', 'assets/imgs/Background.png');
    game.load.image('back','assets/imgs/button_back.png');
    game.load.image('keys','assets/imgs/keys.png');
    game.load.image('spacebar','assets/imgs/spacebar.png');
    game.load.image('mouse','assets/imgs/mouse.png');
    game.load.image('clickedmouse','assets/imgs/clickedmouse.png');

    game.load.audio('bttnSnd','assets/snds/Button.wav')
}

function createInst(){

    let bg = game.add.sprite(0, 0, 'background');
    bg.scale.setTo(0.5, 0.5);

    btnSnd = game.sound.add('bttnSnd',0.05);
    let insStyle ={ font:'Indie Flower', 
                    fontSize: '24px', 
                    fontStyle: 'bold', 
                    fill: '#FFC100', 
                    align: 'center', 
                };

    let instText = 'Shoot the bombs falling along the threads, move from thread to thread\n';
        instText += 'Life items can appear throughout the game,collect them to survive\n';
        instText += 'If a bomb touches you or hits the ground you`ll lose life\n';
        instText += 'If you run out of life, you lose the game\n';
        instText += 'If you manage to survive and eliminate the highest number of bombs, you win.';
    
    let inst = game.add.text(GAME_STAGE_WIDTH/2,GAME_STAGE_HEIGHT/5,instText, insStyle);
    inst.anchor.setTo(0.5,0.5);
    

    //moving

    let move = game.add.text(GAME_STAGE_WIDTH/4 ,GAME_STAGE_HEIGHT * 3/8,'Move',insStyle);

    let keys = game.add.sprite(GAME_STAGE_WIDTH/5,GAME_STAGE_HEIGHT/2,'keys');
    keys.anchor.setTo(0.5,0.5);
    keys.scale.setTo(1,1);
    let mse = game.add.sprite(GAME_STAGE_WIDTH/2.5,GAME_STAGE_HEIGHT/2,'mouse');
    mse.anchor.setTo(0.5,0.5);
    mse.scale.setTo(0.75,0.75);
    

    //shooting
    let shoot = game.add.text(GAME_STAGE_WIDTH* 3/4,GAME_STAGE_HEIGHT * 3/8,'shoot',insStyle);
                
    let spcbar = game.add.sprite(GAME_STAGE_WIDTH/1.5,GAME_STAGE_HEIGHT/2,'spacebar');
    spcbar.anchor.setTo(0.5,0.5);
    spcbar.scale.setTo(1,1);
    let clkmse = game.add.sprite(GAME_STAGE_WIDTH/1.2,GAME_STAGE_HEIGHT/2,'clickedmouse');
    clkmse.anchor.setTo(0.5,0.5);
    clkmse.scale.setTo(0.5,0.5);
    
    
    
    
    let posX = GAME_STAGE_WIDTH / 2 - BUTTON_OFFSET_WIDTH;
    let posY = GAME_STAGE_HEIGHT / 2- BUTTON_OFFSET_HEIGHT;
    btnbck = game.add.button(posX, posY + BUTTON_OFFSETY_BETWEEN *2 , 'back', clickBack);
}
