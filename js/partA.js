const HUD_HEIGHT = 50;
const BULLETS_GROUP_SIZE = 40;
const ENEMIES_GROUP_SIZE = 200;
EXPLOTIONS_GROUP_SIZE = 100;
const TIMER_RHYTHM = 2 * Phaser.Timer.SECOND;
const NUM_LEVELS = 3;
const LEVEL_BOMBS_PROBABILITY = [0.2, 0.4, 0.6, 0.8, 1.0];
const LEVEL_BOMBS_VELOCITY = [50, 100, 150, 200, 250];
const HITS_FOR_LEVEL_CHANGE = 50;

let cursors;
let fireButton;
let character;
let bombs;
let bullets;
let explotion;

let playAState = {
    preload: preloadPartA,
    create: createPartA,
    update: updatePartA
};

function preloadPartA() {
    game.load.image('plus', 'assets/imgs/button_plus.png');
    game.load.image('background', '../assets/imgs/Background.png');
    game.load.image('thread', '../assets/imgs/Thread.png');
    game.load.atlasJSONHash('bullet','assets/imgs/spritesheetBullet.png','assets/jsons/spritesheetBullet.json');
    game.load.atlasJSONHash('bomb', '../assets/imgs/spritesheetBomb.png', '../assets/jsons/spritesheetBomb.json');
    game.load.atlasJSONHash('expl','assets/imgs/spritesheetExplotion.png','assets/jsons/spritesheetExplotion.json');

}

function createPartA() {
    let bg = game.add.sprite(0, 0, 'background');
    bg.scale.setTo(0.5, 0.5);
    createCharacter();
    createKeyControls();
    createBullets(BULLETS_GROUP_SIZE);
    createThreads();
    createBombs(ENEMIES_GROUP_SIZE);
    createExplotions(EXPLOTIONS_GROUP_SIZE);
    

}

function createCharacter() {
    let theCharacter = game.add.sprite(0, 0, 'plus');
    character = new Character(0, theCharacter);

}

function createKeyControls() {
    cursors = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

function createThreads() {
    //threadsArray.forEach(element => game.add.sprite(element - 70, 0, 'thread'));
    for (i = 0; i < threadsArray.length; i++) {
        let thread = game.add.sprite(threadsArray[i] - 35, 0, 'thread');
        thread.scale.setTo(1, 0.74);
    }
}

function createBullets(number) {
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.createMultiple(number, 'bullet');
    bullets.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', resetMember);
    bullets.callAll('anchor.setTo', 'anchor', 0.3, 1.0);
    bullets.setAll('checkWorldBounds', true);
}

function createBombs(number) {
    bombs = game.add.group();
    bombs.enableBody = true;
    bombs.createMultiple(number, 'bomb');
    bombs.callAll('anchor.setTo', 'anchor', 0.5, 1.0);
    bombs.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', resetMember);
    bombs.setAll('checkWorldBounds', true);
    game.time.events.loop(TIMER_RHYTHM, activateBomb, this);
}

function resetMember(item) {
    item.kill();
}

function updatePartA() {
    manageCharacterMovement();
    manageShots();
    game.physics.arcade.overlap(bullets,bombs,bulletHitsBomb,null,this);
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
        bullet.scale.setTo(0.15, 0.15);
        bullet.body.velocity.y = velocity;
        bullet.animations.add('shoot',Phaser.Animation.generateFrameNames('Bullet', 1, 23,'',1,22), 44, true, false);
        bullet.animations.play('shoot');
    }
    return bullet;
}

function manageShots() {
    if (fireButton.justDown) {
        fireBullet();
    }
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

function pickARandom(){
    let rnd = Math.floor(Math.random() * threadsArray.length);
    return threadsArray[rnd];
}

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
    let x = bomb.body.center.x;
    let y = bomb.body.center.y;
    explotion.reset(x, y);
    explotion.animations.play('exploit');
     
}


function bulletHitsBomb(bullet, bomb) {
    bullet.kill();
    bomb.kill();
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


