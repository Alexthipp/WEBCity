const HUD_HEIGHT = 50;
const BULLETS_GROUP_SIZE = 40;
const ENEMIES_GROUP_SIZE = 200;
const TIMER_RHYTHM = 2 * Phaser.Timer.SECOND;
const NUM_LEVELS = 3;
const LEVEL_BOMBS_PROBABILITY = [0.2, 0.4, 0.6, 0.8, 1.0];
const LEVEL_BOMBS_VELOCITY = [50, 100, 150, 200, 250];
const HITS_FOR_LEVEL_CHANGE = 50;

let cursors;
let fireButton;
let character;
let bombs;
let honeys;
let bullets;
let explotion;

let playAState = {
    preload: preloadPartA,
    create: createPartA,
    update: updatePartA
};

/*----------------------------------------------------------------
                        PRELOAD PART
------------------------------------------------------------------*/
function preloadPartA() {
    game.load.image('plus', 'assets/imgs/button_plus.png');
    game.load.image('background', '../assets/imgs/Background.png');
    game.load.image('thread', '../assets/imgs/Thread.png');
    game.load.atlasJSONHash('honey', 'assets/imgs/spritesheetHoneyfruit.png','assets/jsons/spritesheetHoneyfruit.json');
    game.load.atlasJSONHash('bullet','assets/imgs/spritesheetBullet.png','assets/jsons/spritesheetBullet.json');
    game.load.atlasJSONHash('bomb', '../assets/imgs/spritesheetBomb.png', '../assets/jsons/spritesheetBomb.json');
    game.load.atlasJSONHash('expl','assets/imgs/spritesheetExplotion.png','assets/jsons/spritesheetExplotion.json');
}

/*----------------------------------------------------------------
                        CREATE PART
------------------------------------------------------------------*/
function createPartA() {
    let bg = game.add.sprite(0, 0, 'background');
    bg.scale.setTo(0.5, 0.5);
    createKeyControls();
    createBullets(BULLETS_GROUP_SIZE);
    createThreads();
    createBombs(ENEMIES_GROUP_SIZE);
    createHealthItem(ENEMIES_GROUP_SIZE);
    createExplotions(ENEMIES_GROUP_SIZE);
    createCharacter();

}

/*----------------------------------------------------------------
                        UPDATE PART
------------------------------------------------------------------*/
function updatePartA() {
    manageCharacterMovement();
    manageShots();
    game.physics.arcade.overlap(bullets,bombs,bulletHitsBomb,null,this);
    game.physics.arcade.overlap(honeys,character.chSprite,healthHitsCharacter,null,this);
}

/*----------------------------------------------------------------
                    CHARACTER FUNCTIONS 
------------------------------------------------------------------*/

function createCharacter() {
    let theCharacter = game.add.sprite(0, 0, 'plus');
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
    if ( controls == "keyboard" && fireButton.justDown) {
        fireBullet();
    } else if(controls == "mouse" && fireButton.justPressed(10)){
        fireBullet();
    }
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
    let x = character.chSprite.x;
    let y = character.chSprite.y;
    let v = -250;

    let bullet = shootBullet(x, y, v);
}

function shootBullet(x, y, velocity) {
    let bullet = bullets.getFirstExists(false);
    if (bullet) {
        bullet.reset(x, y);
        bullet.scale.setTo(0.15, 0.2);
        bullet.body.velocity.y = velocity;
        bullet.animations.add('shoot',Phaser.Animation.generateFrameNames('Bullet', 1, 23,'',1,22), 44, true, false);
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
    bombs.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', resetMember);
    bombs.setAll('checkWorldBounds', true);
    game.time.events.loop(TIMER_RHYTHM, activateBomb, this);
}

function activateBomb() {
    //if(Math.random() < 0.2) {
        let bomb = bombs.getFirstExists(false);
        if (bomb) {
            let x = pickARandom();
            let y = 0;
            bomb.reset(x, y);
            bomb.scale.setTo(0.1, 0.1);
            bomb.body.velocity.y = 70;
            bomb.animations.add('bombAnimation', Phaser.Animation.generateFrameNames('Bomb', 1, 2,'',1,2), 4, true, false );
            bomb.animations.play('bombAnimation');
        }
    //}
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
    explotion.animations.add('exploit',Phaser.Animation.generateFrameNames('Explotion', 1, 16,'',1,16), 16, false, false);
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
    honeys.callAll('anchor.setTo', 'anchor', 0.5, 0.5);
    honeys.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', resetMember);
    honeys.setAll('checkWorldBounds', true);
}

function displayHealthItem(bx,by){
    let honey = honeys.getFirstExists(false);
        if (honey) {
            honey.reset(bx, by);
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

/*----------------------------------------------------------------
                        COLLISIONS
------------------------------------------------------------------*/

function bulletHitsBomb(bullet, bomb) {
    let x = bomb.body.center.x;
    let y = bomb.body.center.y;
    bullet.kill();
    bomb.kill();
    if(Math.random() < 0.2){
        displayHealthItem(x,y);
    }
    displayExplotion(bomb);
    //soundBlast.play();
    /*score++;
    scoreText.text = 'Score: '+score;
    if (level < NUM_LEVELS && score===level*HITS_FOR_LEVEL_CHANGE) {
        level++;
        levelText.text = 'Level: ' + level;
        currentUfoProbability =
        LEVEL_UFO_PROBABILITY[level-1];
        currentUfoVelocity =
        LEVEL_UFO_VELOCITY[level-1];
    }*/
      
}

function healthHitsCharacter(character, honey){
    honey.kill();
    if(0 < character.health <= 150){
        character.health += 50;
    }else if(character > 150){
        character.health = 200;
    }
}


/*----------------COMENTARIOS PARA EL PROFESOR TUTORIA !!!!!BORRAR ANTES DE ENTREGAR!!!!!!-------------------------------------------------------------------------------------
    -Bombas a veces explotan solas sin que una bala colisione con ellas, puede que sea que hayan dos balas una sin sprite.
    -Por que en la funcion de healthHitsCharacter el orden de los parametros es alreves a como se introducen en la función update.
    
*/