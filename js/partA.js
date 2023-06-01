const HUD_HEIGHT = 50;
const BULLETS_GROUP_SIZE = 40;
const ENEMIES_GROUP_SIZE = 200;
const TIMER_RHYTHM = 1.5 * Phaser.Timer.SECOND;
const NUM_LEVELS = 3;
const LEVEL_BOMBS_PROBABILITY = [0.4, 1.2, 2.0];
const LEVEL_BOMBS_VELOCITY = [50, 150, 250];
const LEVEL_ENEMIES = [10, 20, 40];
const HITS_FOR_LEVEL_CHANGE = 15;


let cursors;
let fireButton;
let bulletTime = 0;
let offsetTimeToFire = 650;
let character;
let bombs;
let honeys;
let bullets;
let explotion;
let healthBar;
let enemiesCreated;
let enemiesDestroyed;
let healthProbability;

let currentBombProbability;
let currentBombVelocity;

let ground

//HUD
let score;
let scoreText;
let level;
let levelText;
let lives;
let livesText;
let health;

//SOUND

let music;
let bulletSound;
let explotionSound;
let healtSound;

let playAState = {
    preload: preloadPartA,
    create: createPartA,
    update: updatePartA
};

/*----------------------------------------------------------------
                        PRELOAD PART
------------------------------------------------------------------*/
function preloadPartA() {
    
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
    game.load.atlasJSONHash('health','assets/imgs/spritesheetHealthBar.png', 'assets/jsons/spritesheetHealthbar.json');

    game.load.audio('bckmusic','assets/snds/backgroundMusicPlaying.mp3');
    game.load.audio('shoot',linkBulletSound);
    game.load.audio('explSnd','assets/snds/Explotion.wav');
    game.load.audio('healthSnd','assets/snds/health.wav');
}

/*----------------------------------------------------------------
                        CREATE PART
------------------------------------------------------------------*/
function createPartA() {
    stateName = 'partA';
    score = 0;
    level = 1;
    health = 100;
    enemiesCreated = 0;
    enemiesDestroyed = 0;
    healthProbability = 0.2;
    
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
    createSounds();

    ground = game.add.sprite(0, GAME_STAGE_HEIGHT-45, 'ground');
    game.physics.enable(ground, Phaser.Physics.ARCADE);

}

/*----------------------------------------------------------------
                        UPDATE PART
------------------------------------------------------------------*/
function updatePartA() {
    manageCharacterMovement();
    manageShots();
    game.physics.arcade.overlap(bullets,bombs,bulletHitsBomb,null,this);
    game.physics.arcade.overlap(honeys,character.chSprite,healthHitsCharacter,null,this);
    game.physics.arcade.overlap(bombs,ground,bombHitsGround,null,this);
    game.physics.arcade.overlap(bombs,character.chSprite,bombHitsGround,null,this);
    
}

/*----------------------------------------------------------------
                    CHARACTER FUNCTIONS 
------------------------------------------------------------------*/

function createCharacter() {
    let theCharacter = game.add.sprite(0, 0, 'character');
    theCharacter.anchor.setTo(0.5,0.5);
    theCharacter.scale.setTo(0.14,0.14);
    game.physics.enable(theCharacter, Phaser.Physics.ARCADE);
    character = new Character(0, theCharacter,200);
}

function manageCharacterMovement() {
    if (controls == 'mouse') {
        if (game.input.speed.x < 0 && game.input.mousePointer.x < character.chSprite.x - threadDistance/2) {
            character.move('left');
        }
        else if (game.input.speed.x > 0 && game.input.mousePointer.x > character.chSprite.x + threadDistance/2) {
            character.move('right');
        }
    }
    else if (controls == 'keyboard') {
        if (cursors.left.justDown) {
            character.move('left');
        }
        else if (cursors.right.justDown) {
            character.move('right');
        }
    }

    
}

/*----------------------------------------------------------------
                    CONTROLS FUNCTIONS 
------------------------------------------------------------------*/

function createKeyControls() {
    cursors = game.input.keyboard.createCursorKeys();
    if(controls == "keyboard"){
        fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    }else if( controls == "mouse"){
        fireButton = game.input.mousePointer.leftButton;
    }
    
}

function manageShots() {
    if ( controls === "keyboard" && fireButton.justDown) {
        if(game.time.now > bulletTime){
            bulletSound.play();
            fireBullet();
            bulletTime = game.time.now + offsetTimeToFire;
        }
        
    } else if(controls === "mouse" && fireButton.justPressed(20)){
        if(game.time.now > bulletTime){
            bulletSound.play();
            fireBullet();
            bulletTime = game.time.now + offsetTimeToFire;
        }
    }
}

/*----------------------------------------------------------------
                    HUD FUNCTIONS 
------------------------------------------------------------------*/

function createHUD() {
    let scoreX = 5;
    let levelX = game.world.width / 2;
    let livesX = game.world.width - 125;
    let allY = 25;
    let styleHUD =
    {fontSize: '18px', fill: '#FFFFFF'};
    scoreText = game.add.text(
    scoreX,allY,'Score: '+score,styleHUD);
    
    levelText = game.add.text(
    levelX,allY,'Level: '+level,styleHUD);
    levelText.anchor.setTo(0.5, 0);

    healthBar = game.add.sprite(livesX, allY, 'health');
    healthBar.animations.add('Lives',Phaser.Animation.generateFrameNames('Healthbar', 1, 6,'',1,6), 6, true, false);
    healthBar.animations.play('Lives');

    let border = game.add.sprite(livesX, allY, 'border');
    livesText = game.add.text(livesX + 50,allY,health,styleHUD);
    
}

function updateLifeBar() {
    healthBar.scale.setTo(health/100, 1)
}


/*----------------------------------------------------------------
                    THREADS FUNCTIONS 
------------------------------------------------------------------*/
function createThreads() {
    //threadsArray.forEach(element => game.add.sprite(element - 70, 0, 'thread'));
    for (i = 0; i < threadsArray.length; i++) {
        let thread = game.add.sprite(threadsArray[i] - 35, 0, 'thread');
        thread.scale.setTo(1, 0.74);
    }
}

/*----------------------------------------------------------------
                    BULLETS FUNCTIONS 
------------------------------------------------------------------*/

function createBullets(number) {
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.createMultiple(number, 'bullet');
    bullets.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', resetMember);
    bullets.callAll('anchor.setTo', 'anchor', 0, 1.0);
    bullets.setAll('checkWorldBounds', true);
}

function fireBullet() {
    let x = character.chSprite.x - 5;
    let y = character.chSprite.y - 50;
    let v = -250;

    let bullet = shootBullet(x, y, v);
}

function shootBullet(x, y, velocity) {
    let bullet = bullets.getFirstExists(false);
    if (bullet) {
        bullet.reset(x, y);
        bullet.scale.setTo(0.15, 0.2);
        bullet.body.velocity.y = velocity;
        bullet.animations.add('shoot',Phaser.Animation.generateFrameNames('Bullet', 1, 23,'',1,22), animbulletvelocity, true, false);
        bullet.animations.play('shoot');
    }
    return bullet;
}

/*----------------------------------------------------------------
                    BOMBS FUNCTIONS 
------------------------------------------------------------------*/

function createBombs(number) {
    bombs = game.add.group();
    bombs.enableBody = true;
    bombs.createMultiple(number, 'bomb');
    bombs.callAll('anchor.setTo', 'anchor', 0.5, 1.0);
    currentBombProbability = LEVEL_BOMBS_PROBABILITY[level-1];
    currentBombVelocity = LEVEL_BOMBS_VELOCITY[level-1];
    game.time.events.loop(TIMER_RHYTHM, activateBomb, this);
}

function activateBomb() {
    if(Math.random() < currentBombProbability && enemiesCreated < LEVEL_ENEMIES[level - 1] ) {
        let bomb = bombs.getFirstExists(false);
        if (bomb) {
            let x = pickARandom();
            let y = 0;
            bomb.reset(x, y);
            bomb.scale.setTo(0.1, 0.1);
            bomb.body.velocity.y = currentBombVelocity;
            bomb.animations.add('bombAnimation', Phaser.Animation.generateFrameNames('Bomb', 1, 2,'',1,2), 4, true, false );
            bomb.animations.play('bombAnimation');
            
            enemiesCreated ++;
        }
    }
}

/*----------------------------------------------------------------
                    EXPLOTIONS FUNCTIONS 
------------------------------------------------------------------*/

function createExplotions(number) {
    explotions = game.add.group();
    explotions.createMultiple(number, 'expl');
    explotions.forEach(setupExplotion, this);
}

function setupExplotion(explotion) {
    explotion.scale.setTo(0.25,0.25);
    explotion.anchor.x = 0.5;
    explotion.anchor.y = 0.5;
    explotion.animations.add('exploit',Phaser.Animation.generateFrameNames('Explotion', 1, 17,'',1,17), 17, false, false);
}

function displayExplotion(bomb) {
    let explotion = explotions.getFirstExists(false);
    if(explotion){
        let x = bomb.body.center.x;
        let y = bomb.body.center.y;
        explotion.reset(x, y);
        explotion.animations.play('exploit');
    }
      
}

/*----------------------------------------------------------------
                    HEALTH ITEM FUNCTIONS 
------------------------------------------------------------------*/

function createHealthItem(number){
    honeys = game.add.group();
    honeys.enableBody = true;
    honeys.createMultiple(number, 'honey');
    honeys.callAll('anchor.setTo', 'anchor', 0.63, 1);
    honeys.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', resetMember);
    honeys.setAll('checkWorldBounds', true);
}

function displayHealthItem(){
    let honey = honeys.getFirstExists(false);
        if (honey) {
            let x = pickARandom();
            honey.reset(x, 0);
            honey.scale.setTo(0.1, 0.1);
            honey.body.velocity.y = 70;
            honey.animations.add('honeyAnimation', Phaser.Animation.generateFrameNames('Honeyfruit', 1, 7,'',1,7), 7, true, false );
            honey.animations.play('honeyAnimation');
        }
}
/*----------------------------------------------------------------
                    AUXILIAR FUNCTIONS 
------------------------------------------------------------------*/

function resetMember(item) {
    item.kill();
}

function pickARandom(){
    let rnd = Math.floor(Math.random() * threadsArray.length);
    return threadsArray[rnd] + 25;
}


function continueGame() {
    
    cursors.left.reset();
    cursors.right.reset();
    currentBombProbability =
    LEVEL_BOMBS_PROBABILITY[level-1];
  
}

function endGame(){
    music.stop();
    game.state.start('endScreen');
}

function checkGameA() {
    if (level < NUM_LEVELS && enemiesDestroyed == LEVEL_ENEMIES[level - 1]) {
        level++;
        levelText.text = 'Level: ' + level;
        currentBombProbability = LEVEL_BOMBS_PROBABILITY[level-1];
        currentBombVelocity = LEVEL_BOMBS_VELOCITY[level-1];
    }else if(level == NUM_LEVELS && enemiesDestroyed == LEVEL_ENEMIES[level - 1]){
        music.stop();
        game.state.start('partB');
    }
}

/*----------------------------------------------------------------
                        COLLISIONS
        -Condición para pasar de parte en BulletHitsBomb()-
            -Condición fin de juego en BombHitsGround()-

------------------------------------------------------------------*/

function bulletHitsBomb(bullet, bomb) {
    bullet.kill();
    bomb.kill();
    enemiesDestroyed ++;
    if(Math.random() < healthProbability){
        displayHealthItem();
    }
    displayExplotion(bomb);
    explotionSound.play();
    score++;
    scoreText.text = 'Score: '+score;
    if (stateName == 'partA'){
        checkGameA();
    }
    else if (stateName == 'partB') {
        checkGameB();
    }
}

function healthHitsCharacter(character, honey){
    honey.kill();
    healtSound.play();

    if(0 < health && health <= 60){
        health += 40;
    }else if(100 >= health && health > 60){
        health = 100;
    }

    livesText.text = health;
    updateLifeBar();
}

function bombHitsGround(ground,bomb){
    displayExplotion(bomb);
    explotionSound.play();
    bomb.kill();
    enemiesDestroyed ++;
    if (score > 0) {
        score --;
        scoreText.text = 'Score: '+score;
    }
    health -= 20;
    livesText.text = health;
    updateLifeBar();

    if(health <= 0){
        let explotion = explotions.getFirstExists(false);
        if(explotion){
            explotion.reset(GAME_STAGE_WIDTH/2, GAME_STAGE_HEIGHT/2);
            explotion.scale.setTo(1.25,1.25);
            explotion.animations.play('exploit');
        }

        game.time.events.add(2500, endGame, this);
    }
    else{
        if (stateName == 'partA'){
            checkGameA();
        }
        else if (stateName == 'partB') {
            checkGameB();
        }
    }
}

/*----------------------------------------------------------------
                        Sound
------------------------------------------------------------------*/
function createSounds() {
    music = game.sound.add('bckmusic',0.05,true);
    music.play();
    bulletSound = game.sound.add('shoot',0.1);
    explotionSound = game.sound.add('explSnd',0.2);
    healtSound = game.sound.add('healthSnd', 0.15);
}
