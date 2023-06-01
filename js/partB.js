let playBState = {
    preload: preloadPartB,
    create: createPartB,
    update: updatePartB
};

const LEVEL_HEALTH = [0.2, 0.1, 0.05];
const LEVEL_PROPABILITY_PORTALS = [0.2,0.4,0.5];

let bluePoint;
let blueDestination;
let redPoint;
let redDestination;
let greenPoint;
let greenDestination;
let yellowPoint;
let yellowDestination;

let teport;

/*----------------------------------------------------------------
                        PRELOAD PART
------------------------------------------------------------------*/

function preloadPartB(){
    game.load.image('ground', 'assets/imgs/Ground.png');
    game.load.image('plus', 'assets/imgs/button_plus.png');
    game.load.image('thread', '../assets/imgs/Thread.png');
    game.load.image('border','../assets/imgs/BorderHealthbar.png');
    game.load.image('character', linkCharacter);
    
    game.load.atlasJSONHash('honey', 'assets/imgs/spritesheetHoneyfruit.png','assets/jsons/spritesheetHoneyfruit.json');
    game.load.atlasJSONHash('bullet',linkBulletPng,linkBulletJson);
    game.load.atlasJSONHash('bomb', '../assets/imgs/spritesheetBomb.png', '../assets/jsons/spritesheetBomb.json');
    game.load.atlasJSONHash('expl','assets/imgs/spritesheetExplotion.png','assets/jsons/spritesheetExplotion.json');
    game.load.atlasJSONHash('background','assets/imgs/spritesheetBackground.png','assets/jsons/spritesheetBackground.json');
    game.load.atlasJSONHash('bluePortal','/assets/imgs/spritesheetBlueCheckpoint.png','assets/jsons/spritesheetBlueCheckpoint.json');
    game.load.atlasJSONHash('redPortal','/assets/imgs/spritesheetRedCheckpoint.png', 'assets/jsons/spritesheetRedCheckpoint.json');
    game.load.atlasJSONHash('greenPortal', '/assets/imgs/spritesheetGreenCheckpoint.png', 'assets/jsons/spritesheetGreenCheckpoint.json');
    game.load.atlasJSONHash('yellowPortal','/assets/imgs/spritesheetYellowCheckpoint.png','assets/jsons/spritesheetYellowCheckpoint.json');
    game.load.atlasJSONHash('health','assets/imgs/spritesheetHealthBar.png', 'assets/jsons/spritesheetHealthbar.json');

    game.load.audio('bckmusic','assets/snds/backgroundMusicPlaying.mp3');
    game.load.audio('shoot',linkBulletSound);
    game.load.audio('explSnd','assets/snds/Explotion.wav');
    game.load.audio('healthSnd','assets/snds/health.wav');
    game.load.audio('teleport','assets/snds/tp.wav');
    game.load.audio('movingSnd','assets/snds/moving.wav');
}

/*----------------------------------------------------------------
                        CREATE PART
------------------------------------------------------------------*/

function createPartB(){
    
    stateName = 'partB';
    level = 1;
    health = 100;
    enemiesCreated = 0;
    enemiesDestroyed = 0;
    healthProbability = LEVEL_HEALTH[level - 1];
    
    let bg = game.add.sprite(0, 0, 'background');
    bg.scale.setTo(2, 2);
    bg.animations.add('Idle',Phaser.Animation.generateFrameNames('Background', 1, 59,'',1,59), 7, true, false);
    bg.animations.play('Idle');

    teport = game.sound.add('teleport', 0.2);

    createKeyControls();
    createThreads();
    createPortals();
    createBullets(BULLETS_GROUP_SIZE);
    createBombs(ENEMIES_GROUP_SIZE);
    createHealthItem(ENEMIES_GROUP_SIZE);
    createExplotions(ENEMIES_GROUP_SIZE);
    createCharacter();
    createHUD();
    createSounds();

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

    game.physics.arcade.overlap(bluePoint, bombs, teletrasnportBomb, null, this);
    game.physics.arcade.overlap(redPoint, bombs, teletrasnportBomb, null, this);
    game.physics.arcade.overlap(greenPoint, bombs, teletrasnportBomb, null, this);
    game.physics.arcade.overlap(yellowPoint, bombs, teletrasnportBomb, null, this);
}


/*----------------------------------------------------------------
                        TELETRANSPORTATION
------------------------------------------------------------------*/

function createPortals() {
    bluePoint = game.add.sprite(threadsArray[0] + 25, 50, 'bluePortal');
    bluePoint.animations.add('bluePoint',Phaser.Animation.generateFrameNames('Bluecheckpoint', 1, 5,'',1,5), 2, true, false);
    bluePoint.animations.play('bluePoint');
    bluePoint.scale.setTo(0.08, 0.08);
    bluePoint.anchor.x = 0.65;
    game.physics.enable(bluePoint, Phaser.Physics.ARCADE);
    bluePoint.enableBody = true;

    blueDestination = game.add.sprite(threadsArray[2] + 25, 150, 'bluePortal');
    blueDestination.scale.setTo(0.08, 0.08);
    blueDestination.anchor.x = 0.65;

    if (numThreads >= 4) {
        redPoint = game.add.sprite(threadsArray[3] + 25, 75, 'redPortal');
        redPoint.animations.add('redPoint',Phaser.Animation.generateFrameNames('Redcheckpoint', 1, 5,'',1,5), 1, true, false);
        redPoint.animations.play('redPoint');
        redPoint.scale.setTo(0.08, 0.08);
        redPoint.anchor.x = 0.65;
        game.physics.enable(redPoint, Phaser.Physics.ARCADE);
        redPoint.enableBody = true;

        redDestination = game.add.sprite(threadsArray[1] + 25, 280, 'redPortal');
        redDestination.scale.setTo(0.08, 0.08);
        redDestination.anchor.x = 0.65;
    }

    if (numThreads >= 6) {
        greenPoint = game.add.sprite(threadsArray[4] + 25, 60, 'greenPortal');
        greenPoint.animations.add('greenPoint',Phaser.Animation.generateFrameNames('Greencheckpoint', 1, 5,'',1,5), 4, true, false);
        greenPoint.animations.play('greenPoint');
        greenPoint.scale.setTo(0.08, 0.08);
        greenPoint.anchor.x = 0.65;
        game.physics.enable(greenPoint, Phaser.Physics.ARCADE);
        greenPoint.enableBody = true;

        greenDestination = game.add.sprite(threadsArray[5] + 25, 250, 'greenPortal');
        greenDestination.scale.setTo(0.08, 0.08);
        greenDestination.anchor.x = 0.65;
    }

    if (numThreads >= 8) {
        yellowPoint = game.add.sprite(threadsArray[6] + 25, 70, 'yellowPortal');
        yellowPoint.animations.add('yellowPoint',Phaser.Animation.generateFrameNames('YellowCheckpoint', 1, 5,'.png',1,5), 5, true, false);
        yellowPoint.animations.play('yellowPoint');
        yellowPoint.scale.setTo(0.08, 0.08);
        yellowPoint.anchor.x = 0.65;
        game.physics.enable(yellowPoint, Phaser.Physics.ARCADE);
        yellowPoint.enableBody = true;

        yellowDestination = game.add.sprite(threadsArray[7] + 25, 200, 'yellowPortal');
        yellowDestination.scale.setTo(0.08, 0.08);
        yellowDestination.anchor.x = 0.65;
    }

}


function teletrasnportBomb(point, bomb) {
    if (bomb.x == point.x && bomb.y > point.y + 50) {
        if (Math.random() < LEVEL_PROPABILITY_PORTALS[level-1]) {
            if (point === bluePoint) {
                bomb.x = blueDestination.x;
                bomb.y = blueDestination.y + 50;
                teport.play();
            }
            else if (point === redPoint) {
                bomb.x = redDestination.x;
                bomb.y = redDestination.y + 50;
                teport.play();
            }
            else if (point === greenPoint) {
                bomb.x = greenDestination.x;
                bomb.y = greenDestination.y + 50;
                teport.play();
            }
            else if (point === yellowPoint) {
                bomb.x = yellowDestination.x;
                bomb.y = yellowDestination.y + 50;
                teport.play();
            }
        }
        else {
            bomb.x += 0.1;
        }
    }
}

function checkGameB() {
    if (level < NUM_LEVELS && enemiesDestroyed == LEVEL_ENEMIES[level - 1]) {
        level++;
        levelText.text = 'Level: ' + level;
        healthProbability = LEVEL_HEALTH[level - 1];
        lowerDestination();
        currentBombProbability = LEVEL_BOMBS_PROBABILITY[level-1];
        currentBombVelocity = LEVEL_BOMBS_VELOCITY_B[level-1];
    }else if(level == NUM_LEVELS && enemiesDestroyed == LEVEL_ENEMIES[level - 1]){
        music.stop();
        game.state.start('endScreen');
    }
}

function lowerDestination() {
    blueDestination.y += 20;
    if (numThreads >= 4) {
        redDestination.y += 20;
    }
    if (numThreads >= 6) {
        greenDestination.y += 20;
    }
    if (numThreads >= 8) {
        yellowDestination.y += 20;
    }
}