let playBState = {
    preload: preloadPartB,
    create: createPartB,
    update: updatePartB
};

/*----------------------------------------------------------------
                        PRELOAD PART
------------------------------------------------------------------*/

function preloadPartB(){
    game.load.image('ground', 'assets/imgs/Ground.png')
    game.load.image('plus', 'assets/imgs/button_plus.png');
    game.load.image('thread', '../assets/imgs/Thread.png');
    game.load.image('border','../assets/imgs/BorderHealthbar.png');
    game.load.image('health','../assets/imgs/HealthBar.png');
    
    game.load.atlasJSONHash('honey', 'assets/imgs/spritesheetHoneyfruit.png','assets/jsons/spritesheetHoneyfruit.json');
    game.load.atlasJSONHash('bullet','assets/imgs/spritesheetBullet.png','assets/jsons/spritesheetBullet.json');
    game.load.atlasJSONHash('bomb', '../assets/imgs/spritesheetBomb.png', '../assets/jsons/spritesheetBomb.json');
    game.load.atlasJSONHash('expl','assets/imgs/spritesheetExplotion.png','assets/jsons/spritesheetExplotion.json');
    game.load.atlasJSONHash('background','assets/imgs/spritesheetBackground.png','assets/jsons/spritesheetBackground.json');
}

/*----------------------------------------------------------------
                        CREATE PART
------------------------------------------------------------------*/

function createPartB(){
    
    stateName = 'partB';
    score = 0;
    level = 1;
    health = 100;
    
    let bg = game.add.sprite(0, 0, 'background');
    bg.scale.setTo(2, 2);
    bg.animations.add('Idle',Phaser.Animation.generateFrameNames('Background', 1, 59,'',1,59), 7, true, false);
    bg.animations.play('Idle');
    
    createKeyControls();
    createBullets(BULLETS_GROUP_SIZE);
    createThreads();
    createBombs(ENEMIES_GROUP_SIZE);
    createHealthItem(ENEMIES_GROUP_SIZE);
    createExplotions(ENEMIES_GROUP_SIZE);
    createCharacter();
    createHUD();

    ground = game.add.sprite(0, GAME_STAGE_HEIGHT-45, 'ground');
    game.physics.enable(ground, Phaser.Physics.ARCADE);
}

/*----------------------------------------------------------------
                        UPDATE PART
------------------------------------------------------------------*/

function updatePartB(){
    manageCharacterMovement();
    manageShots();
    game.physics.arcade.overlap(bullets,bombs,bulletHitsBomb,null,this);
    game.physics.arcade.overlap(honeys,character.chSprite,healthHitsCharacter,null,this);
    game.physics.arcade.overlap(bombs,ground,bombHitsGround,null,this);
    game.physics.arcade.overlap(bombs,character.chSprite,bombHitsGround,null,this);
}