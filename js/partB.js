let playBState = {
    preload: preloadPartB,
    create: createPartB,
    update: updatePartB
};

let bluePoint;
let blueDestination;

/*----------------------------------------------------------------
                        PRELOAD PART
------------------------------------------------------------------*/

function preloadPartB(){
    game.load.image('ground', 'assets/imgs/Ground.png')
    game.load.image('plus', 'assets/imgs/button_plus.png');
    game.load.image('thread', '../assets/imgs/Thread.png');
    game.load.image('border','../assets/imgs/BorderHealthbar.png');
    game.load.image('character', linkCharacter);
    
    game.load.atlasJSONHash('honey', 'assets/imgs/spritesheetHoneyfruit.png','assets/jsons/spritesheetHoneyfruit.json');
    game.load.atlasJSONHash('bullet',linkBulletPng,linkBulletJson);
    game.load.atlasJSONHash('bomb', '../assets/imgs/spritesheetBomb.png', '../assets/jsons/spritesheetBomb.json');
    game.load.atlasJSONHash('expl','assets/imgs/spritesheetExplotion.png','assets/jsons/spritesheetExplotion.json');
    game.load.atlasJSONHash('background','assets/imgs/spritesheetBackground.png','assets/jsons/spritesheetBackground.json');
    game.load.atlasJSONHash('bluePortal','../assets/imgs/spritesheetBlueCheckpoint.png','../assets/jsons/spritesheetBlueCheckpoint.json');
    game.load.atlasJSONHash('health','assets/imgs/spritesheetHealthBar.png', 'assets/jsons/spritesheetHealthbar.json');
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
    createPortals();
    createBombs(ENEMIES_GROUP_SIZE);
    createHealthItem(ENEMIES_GROUP_SIZE);
    createExplotions(ENEMIES_GROUP_SIZE);
    createCharacter();
    createHUD();

    ground = game.add.sprite(0, GAME_STAGE_HEIGHT-45, 'ground');
    game.physics.enable(ground, Phaser.Physics.ARCADE);
}

function createPortals() {
    bluePoint = game.add.sprite(threadsArray[0] + 25, 50, 'bluePortal');
    blueDestination = game.add.sprite(threadsArray[1] + 25, 50, 'bluePortal');
    bluePoint.scale.setTo(0.1, 0.1);
    bluePoint.anchor.x = 0.65;
    game.physics.enable(bluePoint, Phaser.Physics.ARCADE);
    bluePoint.enableBody = true;
    blueDestination.scale.setTo(0.1, 0.1);
    blueDestination.anchor.x = 0.65;

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

    game.physics.arcade.overlap(bluePoint, bombs, teletrasnportBomb, null, this);
}


/*----------------------------------------------------------------
                        TELETRANSPORTATION
------------------------------------------------------------------*/

function teletrasnportBomb(bPoint, bomb) {
    if (bomb.x == bPoint.x) {
        if (Math.random() < 0.5) {
            bomb.x = blueDestination.x;
            bomb.y = blueDestination.y;
        }
        else {
            bomb.x += 0.1;
        }
    }
}