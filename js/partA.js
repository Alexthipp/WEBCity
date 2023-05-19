const HUD_HEIGHT = 50;
const BULLETS_GROUP_SIZE = 40;
const ENEMIES_GROUP_SIZE = 200;
const TIMER_RHYTHM = 0.25 * Phaser.Timer.SECOND;
const NUM_LEVELS = 3;
const LEVEL_BOMBS_PROBABILITY = [0.2, 0.4, 0.6, 0.8, 1.0];
const LEVEL_BOMBS_VELOCITY = [50, 100, 150, 200, 250];
const HITS_FOR_LEVEL_CHANGE = 50;

let cursors;
let fireButton;
let character;
let bombs;
let bullets;

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

}

function createPartA() {
    let bg = game.add.sprite(0, 0, 'background');
    bg.scale.setTo(0.5, 0.5);
    createCharacter();
    createKeyControls();
    createBullets(BULLETS_GROUP_SIZE);
    createThreads();
    createBombs(ENEMIES_GROUP_SIZE);
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
    game.time.events.loop(TIMER_RHYTHM, activateBomb, this);
}

function resetMember(item) {
    item.kill();
}

function updatePartA() {
    manageCharacterMovement();
    manageShots();
}

function manageCharacterMovement() {
    if (controls == 'mouse') {
        if (game.input.speed.x < 0) {
            character.move('left');
        }
        else if (game.input.speed.x > 0) {
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
    if(Math.random() < 0.2) {
        let bomb = bombs.getFirstExists(false);
        if (bomb) {
            let x = threadsArray[0];
            let y = 0;
            bomb.reset(x, y);
            bomb.scale.setTo(0.1, 0.1);
            bomb.body.velocity.y = 100;
            bomb.animations.add('bombAnimation', Phaser.Animation.generateFrameNames('Bomb', 1, 2,'',1,2), 4, true, false );
            bomb.animations.play('bombAnimation');
        }
    }
}