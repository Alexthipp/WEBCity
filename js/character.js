class Character {
    constructor(pos, Sprite, health) {
        this.position = pos;
        this.chSprite = Sprite;
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

    shoot() {
        //Aqui va el codigo de disparar
    }
}