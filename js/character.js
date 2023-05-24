class Character {
    constructor(pos, Sprite, health) {
        this.position = pos;
        this.chSprite = Sprite;
        this.chSprite.x = threadsArray[this.position];
        this.chSprite.y = GAME_STAGE_HEIGHT - 50;
        this.health = health;
    }

    move(direction) {
        if (direction == "left" && this.position > 0) {
            this.chSprite.x = threadsArray[this.position - 1];
            this.position -= 1;
        } else if (direction == "right" && this.position < threadsArray.length - 1) {
            this.chSprite.x = threadsArray[this.position + 1];
            this.position += 1;
        }
    }

    shoot() {
        //Aqui va el codigo de disparar
    }
}