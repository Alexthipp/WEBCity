const GAME_STAGE_WIDTH = 1000;
const GAME_STAGE_HEIGHT = 700;
let game;

let wfConfig = {
    active: function () {
        startGame();
    },

    google: {
        families: ['Rammetto One', 'Sniglet', 'Indie Flower', 'Black Ops One', 'Press Start 2P']
    },
};

WebFont.load(wfConfig);


function startGame() {

    game = new Phaser.Game(GAME_STAGE_WIDTH, GAME_STAGE_HEIGHT, Phaser.CANVAS, 'gamestage')

    game.state.add('startScreen', startState);
    game.state.add('selectPart',selectState);
    game.state.add('settings', settingsState);
    game.state.add('instructions', insState);
    game.state.add('partA', playAState);
    game.state.add('partB',playBState);
    game.state.add('endScreen',endState);
    

    game.state.start('startScreen');
}

const BUTTON_OFFSETY_BETWEEN = 100;
const BUTTON_OFFSET_WIDTH = 102;
const BUTTON_OFFSET_HEIGHT = 37;
const TEXT_OFFSET_VER = 125;
const TEXT_OFFSET_HOR = 500;

let startState= {
    preload: preloadStart,
    create: createStart
};

let result = 'WIN';
let score;


let stateName;
let numThreads = 3;
let controls = 'keyboard';
let linkCharacter = 'assets/imgs/jinx.png';
let linkBulletSound = 'assets/snds/jinxShoot.wav';
let linkBulletPng = 'assets/imgs/spritesheetBulletJinx.png';
let linkBulletJson = 'assets/jsons/spritesheetBulletJinx.json';
let animbulletvelocity = 44;

let time;

let threadDistance = 250;

let threadsArray = [250,500,750];

let musicNP;
let btnSnd;
let msplaying = false;

function preloadStart() {
    game.load.image('background', '../assets/imgs/Background.png');
    game.load.image('play','assets/imgs/button_play.png');
    game.load.image('settings','assets/imgs/button_settings.png');
    game.load.image('instructions','assets/imgs/button_instructions.png');

    game.load.audio('bckmusic','assets/snds/backgroundMusicNotPlaying.mp3');
    game.load.audio('bttnSnd','assets/snds/Button.wav');
}

function createStart() {
    time = 0;
    score = 0;

    
    if(!msplaying){
        musicNP = game.sound.add('bckmusic',0.05,true);
        msplaying = true;
        musicNP.play();
    }

    btnSnd = game.sound.add('bttnSnd',0.05);

    let bg = game.add.sprite(0, 0, 'background');
    bg.scale.setTo(0.5, 0.5);


    let posX = GAME_STAGE_WIDTH / 2 - BUTTON_OFFSET_WIDTH;
    let posY = GAME_STAGE_HEIGHT / 2 - BUTTON_OFFSET_HEIGHT;
    btnPlay = game.add.button(posX, posY - BUTTON_OFFSETY_BETWEEN, 'play', clickPlay);
    btnInst = game.add.button(posX, posY, 'instructions', clickInstrunctions);
    btnStt = game.add.button(posX, posY + BUTTON_OFFSETY_BETWEEN, 'settings', clickSettings);

    let textC = 'Credits:\n';
    textC += 'Alejandro Toro Urdaneta\n';
    textC += 'Jesus Huguet Orosia';
    let styleC = {
        font: 'Indie Flower',
        fontSize: '24px',
        fontStyle: 'bold',
        fill: '#FFC100',
        align: 'center'
    };

    let credits = game.add.text(game.world.width/2, game.world.height - TEXT_OFFSET_VER, textC, styleC);
    credits.anchor.setTo(0.5,0.5);
}

function clickPlay(){
    btnSnd.play();
    game.state.start('selectPart');
}

function clickInstrunctions(){
    
    btnSnd.play();
    game.state.start('instructions');
}

function clickSettings(){
    
    btnSnd.play();
    game.state.start('settings');
}

let selectState = {
    preload: preloadSelect,
    create: createSelect
};

function preloadSelect(){
    
    game.load.image('background', 'assets/imgs/Background.png');
    game.load.image('pA','assets/imgs/button_parta.png');
    game.load.image('pB','assets/imgs/button_partb.png');
    game.load.image('pC','assets/imgs/button_partc.png');
    game.load.audio('bckmusic','assets/snds/backgroundMusicNotPlaying.mp3');
}

function createSelect(){

    let bg = game.add.sprite(0, 0, 'background');
    bg.scale.setTo(0.5, 0.5);

    let posX = GAME_STAGE_WIDTH / 2 - BUTTON_OFFSET_WIDTH;
    let posY = GAME_STAGE_HEIGHT / 2 - BUTTON_OFFSET_HEIGHT;
    btnPartA = game.add.button(posX, posY - BUTTON_OFFSETY_BETWEEN, 'pA', onButtonPressed);
    btnPartB = game.add.button(posX, posY, 'pB', onButtonPressed);
    //btnPartC = game.add.button(posX, posY + BUTTON_OFFSETY_BETWEEN, 'pC', onButtonPressed);
}

function onButtonPressed(button) {
    if(button === btnPartA){
        musicNP.stop();
        msplaying = false;
        game.state.start('partA');
    }
    else if( button === btnPartB){
        musicNP.stop();
        msplaying = false;
        game.state.start('partB');
    }
    
    
}

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
    game.load.image('jinx','assets/imgs/button_jinx.png');
    game.load.image('zoe','assets/imgs/button_zoe.png');

    game.load.audio('bttnSnd','assets/snds/Button.wav');
}



let textNum;
let btnKeybd;
let btnMouse;
let btnJinx;
let btnZoe;
let styleT = {
    font: '25px Arial',
    fill: '#FF0000'
};

function createSettings() {

    let bg = game.add.sprite(0, 0, 'background');
    bg.scale.setTo(0.5, 0.5);

    btnSnd = game.sound.add('bttnSnd',0.05);

    let posX = GAME_STAGE_WIDTH / 2 - BUTTON_OFFSET_WIDTH;
    let posY = GAME_STAGE_HEIGHT / 2 - BUTTON_OFFSET_HEIGHT;
    btnbck = game.add.button(posX, posY + BUTTON_OFFSETY_BETWEEN * 2, 'back', clickBack);

    let textT = 'Threads number: \n\n\n';
    textT += 'Controls: \n\n\n';
    textT += 'Character: ';


    let textThreads = game.add.text(GAME_STAGE_WIDTH / 4, GAME_STAGE_HEIGHT / 4, textT, styleT);

    posX = GAME_STAGE_WIDTH / 2;
    posY = GAME_STAGE_HEIGHT / 4;

    btnPlus = game.add.button(posX + 50, posY - 10, 'plus', modNumberThreads);
    btnPlus.scale.setTo(0.75,0.75);
    btnMenus = game.add.button(posX - 50, posY - 10, 'menus', modNumberThreads);
    btnMenus.scale.setTo(0.75,0.75);

    textNum = game.add.text(GAME_STAGE_WIDTH / 2 + 25, GAME_STAGE_HEIGHT / 4, numThreads, styleT);

    btnKeybd = game.add.button(posX - 120, posY + 50, 'kbd', controlSelection);
    btnMouse = game.add.button(posX + 100, posY + 50, 'mouse', controlSelection);

    btnJinx = game.add.button(posX - 120, posY + 150, 'jinx', characterSelection);
    btnZoe = game.add.button(posX + 100, posY + 150, 'zoe', characterSelection);

    if (controls == 'keyboard'){
        btnKeybd.alpha = 1;
        btnMouse.alpha = 0.5;
    }
    else {
        btnKeybd.alpha = 0.5;
        btnMouse.alpha = 1;
    }

    if (linkCharacter == 'assets/imgs/jinx.png') {
        btnJinx.alpha = 1;
        btnZoe.alpha = 0.5;
    }
    else {
        btnJinx.alpha = 0.5;
        btnZoe.alpha = 1;
    }

}

function clickBack() {
    btnSnd.play();
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
    } else {
        controls = 'mouse';
        btnMouse.alpha = 1;
        btnMouse.input.enable = false;
        btnKeybd.alpha = 0.5;
        btnKeybd.input.enable = true;
    }


}

function characterSelection(button){
    if(button === btnJinx){
        linkCharacter = 'assets/imgs/Jinx.png';
        linkBulletPng = 'assets/imgs/spritesheetBulletJinx.png';
        linkBulletJson = 'assets/jsons/spritesheetBulletJinx.json';
        linkBulletSound = 'assets/snds/jinxShoot.wav';
        animbulletvelocity = 44;
        btnJinx.alpha = 1;
        btnZoe.alpha = 0.5;
    }else{
        linkCharacter = 'assets/imgs/Zoe.png';
        linkBulletPng = 'assets/imgs/spritesheetBulletZoe.png';
        linkBulletJson = 'assets/jsons/spritesheetBulletZoe.json';
        linkBulletSound = 'assets/snds/zoeShoot.mp3';
        animbulletvelocity = 23;
        btnJinx.alpha = 0.5;
        btnZoe.alpha = 1;
    }
}

class Character {
    constructor(pos, sprite, health) {
        this.position = pos;
        this.chSprite = sprite;
        this.chSprite.x = threadsArray[this.position];
        this.chSprite.y = GAME_STAGE_HEIGHT - 125;
        this.health = health;
    }

    move(direction) {
        if (direction == "left" && this.position > 0) {
            this.chSprite.x = threadsArray[this.position - 1];
            this.position -= 1;
            character.chSprite.scale.x *=-1;
        } else if (direction == "right" && this.position < threadsArray.length - 1) {
            this.chSprite.x = threadsArray[this.position + 1];
            this.position += 1;
            character.chSprite.scale.x *=-1;
        }
    }
}

const HUD_HEIGHT = 50;
const BULLETS_GROUP_SIZE = 40;
const ENEMIES_GROUP_SIZE = 200;
const TIMER_RHYTHM = 1.5 * Phaser.Timer.SECOND;
const NUM_LEVELS = 3;
const LEVEL_BOMBS_PROBABILITY = [0.4, 1.2, 2.0];
const LEVEL_BOMBS_VELOCITY_A = [70, 140, 250];
const LEVEL_BOMBS_VELOCITY_B = [70, 140, 200];
const LEVEL_ENEMIES = [10, 20, 40];
const HITS_FOR_LEVEL_CHANGE = 15;


let cursors;
let fireButton;
let bulletTime = 0;
let offsetTimeToFire = 500;
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
let scoreText;
let level;
let levelText;
let timeText;
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
    game.load.audio('movingSnd','assets/snds/moving.wav');
}

/*----------------------------------------------------------------
                        CREATE PART
------------------------------------------------------------------*/
function createPartA() {
    stateName = 'partA';
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
    game.physics.arcade.overlap(honeys,ground,healthHitsGround,null,this);
     
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
            movingSound.play();
        }
        else if (game.input.speed.x > 0 && game.input.mousePointer.x > character.chSprite.x + threadDistance/2) {
            character.move('right');
            movingSound.play();
        }
    }
    else if (controls == 'keyboard') {
        if (cursors.left.justDown) {
            character.move('left');
            movingSound.play();
        }
        else if (cursors.right.justDown) {
            character.move('right');
            movingSound.play();
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
                    {font:'Press Start 2P',
                    fontStyle: 'bold',
                    fontSize: '16px',
                    align: 'center', 
                    fill: '#A200FF'
                };
    scoreText = game.add.text(
    scoreX,allY,'Score:'+score,styleHUD);
    
    levelText = game.add.text(
    levelX,allY, stateName + ' Level: '+level,styleHUD);

    levelText.anchor.setTo(0.5, 0);
    
    timeText = game.add.text(levelX, allY + 25, setTime(time),styleHUD);
    timeText.anchor.setTo(0.5,0);

    healthBar = game.add.sprite(livesX, allY, 'health');
    healthBar.animations.add('Lives',Phaser.Animation.generateFrameNames('Healthbar', 1, 6,'',1,6), 6, true, false);
    healthBar.animations.play('Lives');

    let border = game.add.sprite(livesX, allY, 'border');
    livesText = game.add.text(livesX + 50,allY,health,styleHUD);

    game.time.events.loop(Phaser.Timer.SECOND, updateTime, this);
    
}

function updateLifeBar() {
    healthBar.scale.setTo(health/100, 1)
}

function updateTime(){
    time += 1;
    timeText.text = setTime(time);
}

function setTime(seconds) {
    return String(Math.trunc(seconds / 60)).padStart(2, "0") + ":" +
        String(Math.floor(seconds % 60)).padStart(2, "0");
}

/*----------------------------------------------------------------
                    THREADS FUNCTIONS 
------------------------------------------------------------------*/
function createThreads() {
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
        bullet.scale.setTo(0.15, 0.25);
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
    if(stateName === 'partA'){
        currentBombVelocity = LEVEL_BOMBS_VELOCITY_A[level-1];
    }else if(stateName === 'partB'){
        currentBombVelocity = LEVEL_BOMBS_VELOCITY_B[level-1];
    }
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
    result = 'LOSE';
    game.state.start('endScreen');
}

function checkGameA() {
    if (level < NUM_LEVELS && enemiesDestroyed == LEVEL_ENEMIES[level - 1]) {
        level++;
        levelText.text =  stateName + ' Level: ' + level;
        currentBombProbability = LEVEL_BOMBS_PROBABILITY[level-1];
        currentBombVelocity = LEVEL_BOMBS_VELOCITY_A[level-1];
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
    scoreText.text = 'Score:'+score;
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
        bombs.forEach(resetMember, this);
        character.chSprite.kill();
        game.input.enabled = false;
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

function healthHitsGround(ground,honey){
    honey.kill();
}

/*----------------------------------------------------------------
                        Sound
------------------------------------------------------------------*/
function createSounds() {
    music = game.sound.add('bckmusic',0.07,true);
    music.play();
    bulletSound = game.sound.add('shoot',0.4);
    explotionSound = game.sound.add('explSnd',0.6);
    healtSound = game.sound.add('healthSnd', 0.4);
    movingSound = game.sound.add('movingSnd',0.25);
}

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
    
    let color;

    if(result === 'WIN'){
        color = '#37FF06'
    }else{
        color = '#E10E00';
    }

    let fontStyle ={
                    font: 'Press Start 2P',
                    fill: color,
                    align: 'center',
                    fontSize: '30px'
                    };

    let resultText = game.add.text(GAME_STAGE_WIDTH/2,GAME_STAGE_HEIGHT/4, 'YOU ' + result, fontStyle);
    resultText.anchor.setTo(0.5,0.5);
    
    let scoreText = game.add.text(resultText.x,resultText.y + 60,'Score: '+ score,fontStyle);
    scoreText.anchor.setTo(0.5,0.5);         
    
    let timeText = game.add.text(scoreText.x,scoreText.y + 60,'Time: '+ time,fontStyle);
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
