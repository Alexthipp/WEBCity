
let endState= {
    preload: preloadEnd,
    create: createEnd
};


function preloadEnd() {
    game.load.image('background', 'assets/imgs/Background.png');

}

function createEnd() {
    let bg = game.add.sprite(0, 0, 'background');
    bg.scale.setTo(0.5, 0.5);
    
}
